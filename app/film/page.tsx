import AppTable from "@/components/Tables/AppTable";
import AuthLayout from "../layouts/auth-layout";
import { TFilmList } from "@/types/film.type";
import Image, { StaticImageData } from "next/image";
import imageNotFound from "../../public/images/image-not-found.jpeg";
import {
  IMAGE_HEIGHT_IN_ROW,
  IMAGE_WIDTH_IN_ROW,
} from "@/constants/image-dimensions-in-rows";
import { filmListTableColumns } from "./constants/film-list-table-columns.constant";
import { getFilms } from "@/commons/api-calls.common";
import OpenDetailsButton from "@/components/common/OpenDetailsButton";
import {
  DEFAULT_FILM_LIMIT,
  DEFAULT_FILM_PAGE,
} from "./constants/pagination-configs.constant";

const FilmList = async ({
  searchParams: { page = DEFAULT_FILM_PAGE, limit = DEFAULT_FILM_LIMIT },
}: {
  searchParams: { page: string; limit?: string };
}) => {
  let pageToNumber = parseInt(page, 10);
  if (!pageToNumber || pageToNumber < 1) {
    pageToNumber = 1;
  }

  let limitToNumber = parseInt(limit, 10);
  if (!limitToNumber || limitToNumber < 2) {
    limitToNumber = 2;
  }

  const result = await getFilms({ page: pageToNumber, limit: limitToNumber });

  const createRowElements = (films: TFilmList) => {
    return films?.length > 0 ? (
      <ul>
        {films.map((film) => {
          let posterUrl: string | StaticImageData;
          if (!film.poster || film.poster.url === "") {
            posterUrl = imageNotFound;
          } else {
            posterUrl = film.poster.url;
          }

          const genresOnDisplay = film.genres.join(", ");

          return (
            <li
              className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={film._id}
            >
              <div
                className={`col-span-${filmListTableColumns["Name"]} flex items-center`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-12.5 w-15 rounded-md">
                    <Image
                      src={posterUrl}
                      width={IMAGE_WIDTH_IN_ROW}
                      height={IMAGE_HEIGHT_IN_ROW}
                      alt="Film poster"
                    />
                  </div>

                  <p className="text-sm text-black dark:text-white">
                    {film.name}
                  </p>
                </div>
              </div>
              <div
                className={`col-span-${filmListTableColumns["Genres"]} hidden items-center sm:flex`}
              >
                <p className="text-sm text-black dark:text-white">
                  {genresOnDisplay}
                </p>
              </div>
              <div
                className={`col-span-${filmListTableColumns["Release year"]} flex items-center`}
              >
                <p className="text-sm text-black dark:text-white">
                  {film.releasedAt}
                </p>
              </div>
              <div
                className={`col-span-${filmListTableColumns["Duration"]} flex items-center`}
              >
                <p className="text-sm text-black dark:text-white">
                  {film.durationInMinutes} minutes
                </p>
              </div>
              <div
                className={`col-span-${filmListTableColumns["Status"]} flex items-center`}
              >
                <p className="text-sm text-meta-3">
                  {film.isActive ? "Active" : "Inactive"}
                </p>
              </div>
              <div
                className={`col-span-${filmListTableColumns["Action"]} flex items-center`}
              >
                <OpenDetailsButton detailsPageUrl={`/film/${film._id}`} />
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
          columns={filmListTableColumns}
          rows={result?.data?.films ?? []}
          createRowElements={createRowElements}
          createHref="/film/new"
          pagination={{
            totalItems: result?.data.filmsCount ?? 0,
            currentPage: pageToNumber,
            itemsPerPage: limitToNumber,
            renderPageLink: (pageToNumber) =>
              `film?page=${pageToNumber}&limit=${limitToNumber}`,
          }}
        />
      </div>
    </AuthLayout>
  );
};

export default FilmList;
