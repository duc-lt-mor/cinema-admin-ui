import AppTable from "@/components/Tables/AppTable";
import AuthLayout from "../layouts/auth-layout";
import { TAppTableColumns } from "@/types/app-table.type";
import { TFilmList } from "@/types/film.type";
import Image from "next/image";
import imageNotFound from "../../public/images/image-not-found.jpeg";
import { AxiosResponse } from "axios";
import axiosRef from "@/constants/axios-ref.constant";
import { Api } from "@/constants/api.constant";
import { getServerSession } from "next-auth";
import { authConfig } from "@/constants/nextauth-options.constant";
import { TSessionWithJwt } from "@/types/session-with-jwt.type";
import { TResponse } from "@/types/response.type";

const tableColumns: TAppTableColumns = {
  Name: 3,
  Genres: 2,
  "Release year": 1,
  Duration: 1,
  Status: 1,
};

const getFilms = async (
  accessToken: string,
  pagination: { page: number; limit: number },
) => {
  try {
    const result: AxiosResponse<
      TResponse<{
        films: TFilmList;
        page: number;
        filmsCount: number;
      }>
    > = await axiosRef.get(Api.FILM, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: pagination,
    });

    if (result.data?.type === "success") {
      return result.data;
    }
  } catch (error) {
    console.log((error as any).toJSON());
  }
};

const FilmList = async ({
  searchParams: { page, limit = "5" },
}: {
  searchParams: { page: string; limit?: string };
}) => {
  let _page = parseInt(page, 10);
  _page = !_page || _page < 1 ? 1 : _page;
  let _limit = parseInt(limit, 10);
  _limit = !_limit || _limit < 2 ? 2 : _limit;

  const {
    tokens: { accessToken },
  } = (await getServerSession(authConfig)) as TSessionWithJwt;

  const result = await getFilms(accessToken, { page: _page, limit: _limit });

  const createRowElements = (films: TFilmList) => {
    return films?.length > 0 ? (
      <ul>
        {films.map((film) => {
          return (
            <li
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 cursor-pointer"
              key={film._id}
            >
              <div
                className={`col-span-${tableColumns["Name"]} flex items-center`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-12.5 w-15 rounded-md">
                    <Image
                      src={
                        !!film.poster?.url ? film.poster?.url : imageNotFound
                      }
                      width={60}
                      height={50}
                      alt="Film poster"
                    />
                  </div>

                  <p className="text-sm text-black dark:text-white">
                    {film.name}
                  </p>
                </div>
              </div>
              <div
                className={`col-span-${tableColumns["Genres"]} hidden items-center sm:flex`}
              >
                <p className="text-sm text-black dark:text-white">
                  {film.genres.reduce((prevGenres, currGenre, idx, genres) => {
                    let displayText = `${prevGenres}${currGenre}`;
                    if (idx !== genres.length - 1) {
                      displayText = `${displayText}, `;
                    }
                    return displayText;
                  }, "")}
                </p>
              </div>
              <div
                className={`col-span-${tableColumns["Release year"]} flex items-center`}
              >
                <p className="text-sm text-black dark:text-white">
                  {film.releasedAt}
                </p>
              </div>
              <div
                className={`col-span-${tableColumns["Duration"]} flex items-center`}
              >
                <p className="text-sm text-black dark:text-white">
                  {film.durationInMinutes} minutes
                </p>
              </div>
              <div
                className={`col-span-${tableColumns["Status"]} flex items-center`}
              >
                <p className="text-sm text-meta-3">
                  {film.isActive ? "Active" : "Inactive"}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    ) : (
      <p className="border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5 text-center">
        No films are found
      </p>
    );
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-5">
        <AppTable
          title="Films"
          columns={tableColumns}
          rows={result?.data.films ?? []}
          createRowElements={createRowElements}
          createHref="/film/new"
          pagination={{
            totalItems: result?.data.filmsCount ?? 0,
            currentPage: _page,
            itemsPerPage: _limit,
            renderPageLink: (_page) => `film?page=${_page}&limit=${_limit}`,
          }}
        />
      </div>
    </AuthLayout>
  );
};

export default FilmList;
