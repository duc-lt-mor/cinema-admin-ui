import { ReactNode } from "react";

type SizeInGridLayout = number;

export type PaginationProps = {
  totalItems: number;
  currentPage: number;
  renderPageLink: (page: number) => string;
  itemsPerPage: number;
};

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
  filter?: ReactNode;
};
