"use client";
import { usePathname, useSearchParams } from "next/navigation";

import { usePagination } from "@/hooks/common/use-pagination";
import { updateURLParams } from "@/lib/utils";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  path?: string;
  className?: string;
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  path = "",
  className,
}: PaginationComponentProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingsCount: 1,
  });

  if (!paginationRange || paginationRange.length < 2) {
    return null;
  }

  const baseUrl = `${pathname}${path}`;

  const createPageUrl = (pageNumber: number) => {
    return `${baseUrl}${updateURLParams(searchParams, { page: pageNumber.toString() })}`;
  };

  return (
    <Pagination className={className}>
      <PaginationContent className="gap-1 md:gap-3 xl:gap-5">
        <PaginationItem>
          {currentPage !== 1 && (
            <PaginationPrevious
              href={createPageUrl(currentPage - 1)}
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : undefined}
              className={`${currentPage === 1 ? "pointer-events-none opacity-50" : ""} sm:bg-custom-orange-2 h-10 w-10 rounded-lg text-sm sm:h-13 sm:w-20 md:h-15 md:!min-w-24.5`}
            />
          )}
        </PaginationItem>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === "DOTS") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={pageNumber} className="rounded-2.5">
              <PaginationLink
                href={createPageUrl(pageNumber as number)}
                isActive={pageNumber === currentPage}
                className={`${
                  pageNumber === currentPage
                    ? "bg-primary hover:bg-parimary text-white hover:text-white"
                    : "bg-custom-orange-2"
                } xs-530:h-15 xs-530:w-15 h-9 w-9 rounded-lg text-xs font-medium sm:h-13 sm:w-13 sm:text-base`}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href={createPageUrl(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : undefined}
            className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : ""} sm:bg-custom-orange-2 h-10 w-10 rounded-lg pr-0 sm:h-13 sm:w-20 md:h-15 md:w-24.5`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
