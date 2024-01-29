"use client";
import AppTable from "@/components/Tables/AppTable";
import AuthLayout from "../layouts/auth-layout";
import { TFilmList } from "@/types/film.type";
import "../pagination.css";
import { filmListTableColumns } from "./constants/film-list-table-columns.constant";
import { getFilms } from "@/commons/api-calls.common";
import { useQuery } from "@tanstack/react-query";
import FilmRow from "./film-row";

const FilmList = ({ page, limit }: { page: number; limit: number }) => {
  const { data: result } = useQuery({
    queryKey: [`films?page=${page}&limit=${limit}`],
    queryFn: () => {
      return getFilms({ page, limit });
    },
  });

  const createRowElements = (films: TFilmList) => {
    return films?.length > 0 ? (
      <ul>
        {films.map((film) => {
          return <FilmRow film={film} key={film._id} />;
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
            currentPage: page,
            itemsPerPage: limit,
            renderPageLink: (_page) => `film?page=${_page}&limit=${limit}`,
          }}
        />
      </div>
    </AuthLayout>
  );
};

export default FilmList;
