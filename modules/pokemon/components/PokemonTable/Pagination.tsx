import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";
import { ReactNode } from "react";

export default function TablePagination({
  currentPage,
  pageCount,
  pageSize,
}: {
  currentPage: number;
  pageCount: number;
  pageSize: number;
}) {
  const totalPageCount = Math.ceil(pageCount / pageSize);

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    const createPageItem = (pageNum: number) => {
      return (
        <PaginationItem key={pageNum}>
          <PaginationLink
            href={`?page=${pageNum}`}
            isActive={currentPage === pageNum}
          >
            {pageNum}
          </PaginationLink>
        </PaginationItem>
      );
    };
    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(createPageItem(i));
      }
    } else {
      items.push(createPageItem(1));

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPageCount - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(createPageItem(i));
      }

      if (currentPage < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(createPageItem(totalPageCount));
    }
    return items;
  };

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${currentPage - 1}`}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext href={`?page=${currentPage + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
