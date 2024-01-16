import Link from "next/link";
import React from "react";
import usePagination, { dotts } from "../../hooks/usePagination";
import "../../app/pagination.css";

export type PaginationProps = {
  totalItems: number;
  currentPage: number;
  renderPageLink: (page: number) => string;
  itemsPerPage: number;
};

const Pagination = ({
  totalItems,
  currentPage,
  itemsPerPage,
  renderPageLink,
}: PaginationProps) => {
  const pages = usePagination(totalItems, currentPage, itemsPerPage);

  return (
    <ul className="flex items-center justify-center my-8">
      {pages.map((pageNumber, i) => (
        <li
          key={i}
          className={`page-item ${
            pageNumber === currentPage ? "page-active" : ""
          }`}
        >
          {pageNumber === dotts ? (
            <span>{pageNumber}</span>
          ) : (
            <Link
              href={renderPageLink(pageNumber as number)}
              className="page-link"
            >
              {pageNumber}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
