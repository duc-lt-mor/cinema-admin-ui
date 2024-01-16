"use client";
import AppTable from "@/components/Tables/AppTable";
import AuthLayout from "../layouts/auth-layout";
import { TAppTableColumns, TCreateRowElements } from "@/types/app-table.type";
import { TFilmList } from "@/types/film.type";
import Image from "next/image";
import imageNotFound from "../../public/images/image-not-found.jpeg";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

const films: TFilmList = Array.from({ length: 20 }, (_, i) => i + 1).map(
  (filmId) => {
    return {
      _id: filmId.toString(),
      name: `film${filmId}`,
      genres: ["romance"],
      releasedAt: "2016",
      durationInMinutes: 107,
      isActive: true,
    };
  },
);

const FilmList = () => {
  const router = useRouter();

  const tableColumns = useMemo<TAppTableColumns>(
    () => ({
      Name: 3,
      Genres: 2,
      "Release year": 1,
      Duration: 1,
      Status: 1,
    }),
    [],
  );

  const createRowElements = useCallback<TCreateRowElements<TFilmList>>(
    (films: TFilmList) => {
      const handleRowClick = (filmId: string) => {
        router.push(`/film/${filmId}`);
      };

      return films?.length > 0 ? (
        <ul>
          {films.map((film) => {
            return (
              <li
                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 cursor-pointer"
                key={film._id}
                onClick={() => handleRowClick(film._id)}
              >
                <div
                  className={`col-span-${tableColumns["Name"]} flex items-center`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-12.5 w-15 rounded-md">
                      <Image
                        src={film.poster?.url ?? imageNotFound}
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
                    {film.genres.reduce(
                      (prevGenres, currGenre, idx, genres) => {
                        let displayText = `${prevGenres}${currGenre}`;
                        if (idx !== genres.length - 1) {
                          displayText = `${displayText}, `;
                        }
                        return displayText;
                      },
                      "",
                    )}
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
    },
    [router, tableColumns],
  );

  const handleCreateButtonOnClick = useCallback(() => {
    router.push("film/new");
  }, [router]);

  return (
    <AuthLayout>
      <div className="flex flex-col gap-10">
        <AppTable
          title="Films"
          columns={tableColumns}
          rows={films}
          createRowElements={createRowElements}
          handleCreateButtonOnClick={handleCreateButtonOnClick}
        />
      </div>
    </AuthLayout>
  );
};

export default FilmList;
