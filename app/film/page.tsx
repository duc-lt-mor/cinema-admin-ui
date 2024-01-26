import { getFilms } from "@/commons/api-calls.common";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import {
  DEFAULT_FILM_LIMIT,
  DEFAULT_FILM_PAGE,
} from "./constants/pagination-configs.constant";
import FilmList from "./film-list";

const FilmLoader = async ({
  searchParams: { page = DEFAULT_FILM_PAGE, limit = DEFAULT_FILM_LIMIT },
}: {
  searchParams: {
    page: string;
    limit?: string;
  };
}) => {
  const queryClient = new QueryClient();
  let pageToNumber = parseInt(page, 10);
  if (!pageToNumber || pageToNumber < 1) {
    pageToNumber = 1;
  }

  let limitToNumber = parseInt(limit, 10);
  if (!limitToNumber || limitToNumber < 2) {
    limitToNumber = 2;
  }

  await queryClient.prefetchQuery({
    queryKey: [`films?page=${pageToNumber}&limit=${limitToNumber}`],
    queryFn: () => {
      return getFilms({ page: pageToNumber, limit: limitToNumber });
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilmList page={pageToNumber} limit={limitToNumber} />
    </HydrationBoundary>
  );
};

export default FilmLoader;
