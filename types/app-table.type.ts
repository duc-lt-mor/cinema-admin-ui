import { PaginationProps } from "@/components/Pagination/Pagination";
import { ReactNode } from "react";

type SizeInGridLayout = number;

export type TAppTableColumns = {
  [columnName: string]: SizeInGridLayout;
};

export type TCreateRowElements<TRows extends any[]> = (
  rows: TRows,
) => ReactNode;

export type TAppTable<TRows extends any[]> = {
  title: string;
  columns: TAppTableColumns;
  rows: TRows;
  createRowElements: TCreateRowElements<TRows>;
  createHref: string;
  pagination: PaginationProps;
};
