export function paginationToNumber({
  page,
  limit,
}: {
  page: string;
  limit: string;
}) {
  let pageToNumber = parseInt(page, 10);
  if (!pageToNumber || pageToNumber < 1) {
    pageToNumber = 1;
  }

  let limitToNumber = parseInt(limit, 10);
  if (!limitToNumber || limitToNumber < 2) {
    limitToNumber = 2;
  }

  return { pageToNumber, limitToNumber };
}
