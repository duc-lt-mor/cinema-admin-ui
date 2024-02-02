export const filmKeys = {
  all: ["films"] as const,
  paginate: (page: number, limit: number) =>
    [...filmKeys.all, page, limit] as const,
};
