export const screeningKeys = {
  all: ["screening"] as const,
  paginate: (page: number, limit: number) =>
    [...screeningKeys.all, page, limit] as const,
};
