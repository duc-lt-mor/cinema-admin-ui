"use client";
import { TScreeningList } from "@/types/screening.type";
import AuthLayout from "../layouts/auth-layout";
import AppTable from "@/components/Tables/AppTable";
import { screeningListTableColumns } from "./constants/screening-list-table-columns.constant";
import ScreeningRow from "./screening-row";
import { useQuery } from "@tanstack/react-query";
import { getScreenings } from "@/commons/api-calls.common";
import "../pagination.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setScreeningPagination } from "@/lib/features/screening/screening-slice";
import { screeningKeys } from "./constants/query-key-factory.constant";
import ScreeningFilter from "./screening-filter";
import { useEffect } from "react";

const ScreeningList = ({ page, limit }: { page: number; limit: number }) => {
  const { filter: screeningFilter } = useAppSelector(
    (state) => state.screening,
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setScreeningPagination({ page, limit }));
  }, [page, limit]);

  const { data: result } = useQuery({
    queryKey: screeningKeys.filter({ page, limit, ...screeningFilter }),
    queryFn: () => {
      return getScreenings({ page, limit, ...screeningFilter });
    },
  });

  const createRowElements = (screenings: TScreeningList) => {
    return screenings?.length > 0 ? (
      <ul>
        {screenings.map((screening) => {
          return <ScreeningRow screening={screening} key={screening._id} />;
        })}
      </ul>
    ) : (
      <p className="border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5 text-center">
        No screenings are found
      </p>
    );
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-5">
        <AppTable
          title="Screenings"
          columns={screeningListTableColumns}
          rows={result?.data?.screenings ?? []}
          createRowElements={createRowElements}
          createHref="/screening/new"
          pagination={{
            totalItems: result?.data.screeningsCount ?? 0,
            currentPage: page,
            itemsPerPage: limit,
            renderPageLink: (_page) => `screening?page=${_page}&limit=${limit}`,
          }}
          filter={<ScreeningFilter />}
        />
      </div>
    </AuthLayout>
  );
};

export default ScreeningList;
