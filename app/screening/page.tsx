import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import {
  DEFAULT_SCREENING_LIMIT,
  DEFAULT_SCREENING_PAGE,
} from "./constants/pagination-configs.constant";
import ScreeningList from "./screening-list";
import { getScreenings } from "@/commons/api-calls.common";

const ScreeningLoader = async ({
  searchParams: {
    page = DEFAULT_SCREENING_PAGE,
    limit = DEFAULT_SCREENING_LIMIT,
  },
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
    queryKey: [`screenings?page=${pageToNumber}&limit=${limitToNumber}`],
    queryFn: () => {
      return getScreenings({ page: pageToNumber, limit: limitToNumber });
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ScreeningList page={pageToNumber} limit={limitToNumber} />;
    </HydrationBoundary>
  );
};

export default ScreeningLoader;
