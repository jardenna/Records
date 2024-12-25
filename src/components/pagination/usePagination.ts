import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export enum PaginationActionEnum {
  First = 'First',
  Last = 'Last',
  Next = 'Next',
  NextPaginationItem = 'jump-next',
  Prev = 'Prev',
  PrevPaginationItem = 'jump-prev',
}

interface UsePaginationProps {
  currentPage: number;
  pageLimit: number;
  rowsPerPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalCount: number;
}

const usePagination = ({
  totalCount,
  rowsPerPage,
  pageLimit,
  currentPage,
  setCurrentPage,
}: UsePaginationProps) => {
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [pageRange, setPageRange] = useState<number[]>([]);

  // Calculate total page count whenever totalCount or rowsPerPage changes
  useEffect(() => {
    const pageCount = Math.ceil(totalCount / rowsPerPage);
    setTotalPageCount(pageCount);
  }, [totalCount, rowsPerPage]);

  // Generate the page range based on current page and pageLimit
  useEffect(() => {
    if (totalPageCount === 0) {
      setPageRange([]);
      return;
    }

    // Determine the start and end of the page range
    const halfPageLimit = Math.floor(pageLimit / 2);
    let rangeStart = Math.max(1, currentPage - halfPageLimit);
    const rangeEnd = Math.min(totalPageCount, rangeStart + pageLimit - 1);

    // Adjust the range if it doesn't fill up the pageLimit
    if (rangeEnd - rangeStart + 1 < pageLimit) {
      rangeStart = Math.max(1, rangeEnd - pageLimit + 1);
    }

    const pages = [];
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    setPageRange(pages);
  }, [currentPage, totalPageCount, pageLimit]);

  // Set currentPage to 1 when rowsPerPage is changes
  useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage]);

  // Handle clicking on a specific page
  const handlePaginationItemClick = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPageCount))); // keep within bounds
  };
  // Unified pagination handler
  const handlePaginationAction = (action: PaginationActionEnum) => {
    switch (action) {
      case PaginationActionEnum.First:
        handlePaginationItemClick(1);
        break;
      case PaginationActionEnum.Prev:
        handlePaginationItemClick(currentPage - 1);
        break;
      case PaginationActionEnum.Next:
        handlePaginationItemClick(currentPage + 1);
        break;
      case PaginationActionEnum.Last:
        handlePaginationItemClick(totalPageCount);
        break;
      case PaginationActionEnum.PrevPaginationItem:
        handlePaginationItemClick(Math.max(1, currentPage - pageLimit));
        break;
      case PaginationActionEnum.NextPaginationItem:
        handlePaginationItemClick(
          Math.min(totalPageCount, currentPage + pageLimit),
        );
        break;
      default:
        break;
    }
  };

  return {
    currentPage,
    totalPageCount,
    pageRange,
    onPaginationItemClick: handlePaginationItemClick,
    onPaginationAction: handlePaginationAction,
  };
};

export default usePagination;
