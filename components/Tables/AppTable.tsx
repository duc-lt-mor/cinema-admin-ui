import { TAppTable } from "@/types/app-table.type";
import Link from "next/link";
import Pagination from "../Pagination/Pagination";

const AppTable = <TRows extends any[]>(props: TAppTable<TRows>) => {
  const { title, columns, createRowElements, rows, createHref, pagination } =
    props;

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h4>
          <Link
            href={createHref}
            className="flex items-center justify-center gap-2.5 bg-primary py-1.5 px-3.5 font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3h18v18H3zM12 8v8m-4-4h8" />
              </svg>
            </span>
            Create
          </Link>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          {Object.keys(columns).map((columnName, i) => {
            return (
              <div
                className={`col-span-${columns[columnName]} flex items-center`}
                key={i}
              >
                <p className="font-medium">{columnName}</p>
              </div>
            );
          })}
        </div>

        {createRowElements(rows)}
      </div>
      <div className="flex flex-row-reverse">
        <Pagination {...pagination} />
      </div>
    </>
  );
};

export default AppTable;
