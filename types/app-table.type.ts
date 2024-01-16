import { ReactNode } from "react";
import { ReactPaginateProps } from "react-paginate";

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
  handleCreateButtonOnClick: (...args: any) => void;
  pagination: ReactPaginateProps;
};