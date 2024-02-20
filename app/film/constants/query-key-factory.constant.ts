import { TFilmFilterWithPagination } from "@/types/film.type";

export const filmKeys = {
  all: ["films"] as const,
  filter: (filter: TFilmFilterWithPagination) =>
    [...filmKeys.all, { filter }] as const,
};
