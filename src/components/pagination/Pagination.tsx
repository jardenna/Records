import { FC } from 'react';
import PaginationItems from './PaginationItems';

interface PaginationProps {
  currentPage: number;
  onPageClick: (page: number) => void;
  onPaginationAction: (action: string) => void;
  pageLimit: number;
  pageRange: number[];
  totalPageCount: number;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  pageRange,
  totalPageCount,
  pageLimit,
  onPaginationAction,
  onPageClick,
}) => (
  <article>
    <ul className="pagination">
      {/* Jump Previous */}
      {currentPage > pageLimit && (
        <li className="pagination-item">
          <button type="button" onClick={() => onPaginationAction('jump-prev')}>
            Jump Previous
          </button>
        </li>
      )}

      {/* First Page */}
      <li className="pagination-item">
        <button
          type="button"
          onClick={() => onPaginationAction('first')}
          disabled={currentPage === 1}
        >
          First
        </button>
      </li>

      {/* Prev Page */}
      <li className="pagination-item">
        <button
          type="button"
          onClick={() => onPaginationAction('prev')}
          disabled={currentPage === 1}
        >
          Prev
        </button>
      </li>

      {/* Page Numbers */}
      {pageRange.map((page: any) => (
        <PaginationItems
          key={page}
          onSetCurrentPage={onPageClick}
          paginationCount={page}
          currentPage={currentPage}
        />
      ))}

      {/* Next Page */}
      <li className="pagination-item">
        <button
          type="button"
          onClick={() => onPaginationAction('next')}
          disabled={currentPage === totalPageCount}
        >
          Next
        </button>
      </li>

      {/* Jump Next */}
      {currentPage < totalPageCount - pageLimit && (
        <li className="pagination-item">
          <button type="button" onClick={() => onPaginationAction('jump-next')}>
            Jump Next
          </button>
        </li>
      )}

      {/* Last Page */}
      <li className="pagination-item">
        <button
          type="button"
          onClick={() => onPaginationAction('last')}
          disabled={currentPage === totalPageCount}
        >
          Last
        </button>
      </li>
    </ul>
  </article>
);

export default Pagination;
