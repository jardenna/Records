import { useEffect, useState } from 'react';

interface UsePaginationProps {
  // total records count
  rowsPerPage: number;
  totalCount: number;
  // records per page
  pageLimit?: number; // max number of page buttons to show at once
}

const usePagination = ({
  totalCount,
  rowsPerPage,
  pageLimit = 5,
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
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

  // Handle clicking on a specific page
  const handlePageClick = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPageCount))); // keep within bounds
  };
  // Unified pagination handler
  const handlePaginationAction = (action: string) => {
    switch (action) {
      case 'first':
        handlePageClick(1);
        break;
      case 'prev':
        handlePageClick(currentPage - 1);
        break;
      case 'next':
        handlePageClick(currentPage + 1);
        break;
      case 'last':
        handlePageClick(totalPageCount);
        break;
      case 'jump-prev':
        // Assuming jump is by 5 pages; adjust as needed
        handlePageClick(Math.max(1, currentPage - 5));
        break;
      case 'jump-next':
        handlePageClick(Math.min(totalPageCount, currentPage + 5));
        break;
      default:
        break;
    }
  };

  return {
    currentPage,
    totalPageCount,
    pageRange,
    handlePageClick,
    handlePaginationAction,
  };
};

export default usePagination;
