import {
  DEFAULT_SCREENING_LIMIT,
  DEFAULT_SCREENING_PAGE,
} from "./constants/pagination-configs.constant";
import ScreeningList from "./screening-list";

const ScreeningLoader = ({
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
  let pageToNumber = parseInt(page, 10);
  if (!pageToNumber || pageToNumber < 1) {
    pageToNumber = 1;
  }

  let limitToNumber = parseInt(limit, 10);
  if (!limitToNumber || limitToNumber < 2) {
    limitToNumber = 2;
  }

  return <ScreeningList page={pageToNumber} limit={limitToNumber} />;
};

export default ScreeningLoader;
