import { FC } from 'react';
import PaginationItems from './PaginationItems';

interface PaginationProps {
  currentPage: number;
  onPaginationAction: (action: string) => void;
  onPaginationItemClick: (page: number) => void;
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
  onPaginationItemClick,
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
      {pageRange.map((page) => (
        <PaginationItems
          key={page}
          onSetCurrentPage={onPaginationItemClick}
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
