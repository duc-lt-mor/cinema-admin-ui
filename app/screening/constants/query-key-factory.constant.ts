import { TScreeningFilterWithPagination } from "@/types/screening.type";

export const screeningKeys = {
  all: ["screening"] as const,
  filter: (filter: TScreeningFilterWithPagination) =>
    [...screeningKeys.all, { filter }] as const,
};
