import { FC } from 'react';
import './_pagination.scss';
import PaginationItems from './PaginationItems';

export interface PaginationProps {
  currentPage: number;
  handleFirstPage: () => void;
  handleLastPage: () => void;
  handleNext: () => void;
  handlePageClick: (currentPage: number) => void;
  handlePrevious: () => void;
  paginationCount: number;
  startPage: number;
  pageLimit?: number;
}

const Pagination: FC<PaginationProps> = ({
  startPage,
  handlePrevious,
  handleFirstPage,
  handlePageClick,
  handleLastPage,
  currentPage,
  paginationCount,
  handleNext,
  pageLimit = 5,
}) => {
  const endPage = Math.min(startPage + pageLimit - 1, paginationCount);
  const pageRange = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <article>
      <ul className="pagination">
        {/* Jump Previous */}
        {startPage > 1 && (
          <li className="pagination-item">
            <button type="button" onClick={handlePrevious}>
              Jump Previous
            </button>
          </li>
        )}

        {/* First Page */}
        <li className="pagination-item">
          <button
            type="button"
            onClick={handleFirstPage}
            disabled={currentPage === 1}
          >
            First
          </button>
        </li>

        {/* Prev Page */}
        <li className="pagination-item">
          <button
            type="button"
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>

        {/* Page Numbers */}
        {pageRange.map((page: any) => (
          <PaginationItems
            key={page}
            onSetCurrentPage={handlePageClick}
            paginationCount={page}
            currentPage={currentPage}
          />
        ))}

        {/* Next Page */}
        <li className="pagination-item">
          <button
            type="button"
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === paginationCount}
          >
            Next
          </button>
        </li>

        {/* Jump Next */}
        {endPage < paginationCount && (
          <li className="pagination-item">
            <button type="button" onClick={handleNext}>
              Jump Next
            </button>
          </li>
        )}

        {/* Last Page */}
        <li className="pagination-item">
          <button
            type="button"
            onClick={handleLastPage}
            disabled={currentPage === paginationCount}
          >
            Last
          </button>
        </li>
      </ul>
    </article>
  );
};

export default Pagination;
