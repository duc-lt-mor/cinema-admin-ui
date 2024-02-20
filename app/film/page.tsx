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
import { paginationToNumber } from "@/commons/pagination-to-number.common";

const FilmLoader = ({
  searchParams: { page = DEFAULT_FILM_PAGE, limit = DEFAULT_FILM_LIMIT },
}: {
  searchParams: {
    page: string;
    limit?: string;
  };
}) => {
  const queryClient = new QueryClient();
  const { pageToNumber, limitToNumber } = paginationToNumber({ page, limit });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilmList page={pageToNumber} limit={limitToNumber} />
    </HydrationBoundary>
  );
};

export default FilmLoader;
