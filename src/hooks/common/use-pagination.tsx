'use client';
import { useMemo } from 'react';

interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  siblingsCount?: number;
}

export function usePagination({ currentPage, totalPages, siblingsCount = 1 }: UsePaginationProps) {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingsCount + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingsCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingsCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, 'DOTS', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingsCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [1, 'DOTS', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, 'DOTS', ...middleRange, 'DOTS', totalPages];
    }
  }, [totalPages, currentPage, siblingsCount]);

  return paginationRange;
}

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
}
