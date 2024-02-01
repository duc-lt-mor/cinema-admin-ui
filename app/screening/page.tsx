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
import { paginationToNumber } from "@/commons/pagination-to-number.common";

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
  const { pageToNumber, limitToNumber } = paginationToNumber({ page, limit });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ScreeningList page={pageToNumber} limit={limitToNumber} />
    </HydrationBoundary>
  );
};

export default ScreeningLoader;
