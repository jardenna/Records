import { FC } from 'react';
import Button from '../Button';
import PaginationItems from './PaginationItems';
import './_pagination.scss';
import { PaginationActionEnum } from './usePagination';

interface PaginationProps {
  currentPage: number;
  onPaginationAction: (action: any) => void;
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
      {/* First Page */}
      <li className="pagination-item">
        <button
          type="button"
          onClick={() => onPaginationAction(PaginationActionEnum.First)}
          disabled={currentPage === 1}
        >
          1
        </button>
      </li>
      {/* Jump Previous */}

      <li className="pagination-item">
        <Button
          disabled={currentPage < pageLimit}
          onClick={() =>
            onPaginationAction(PaginationActionEnum.PrevPaginationItem)
          }
        >
          <span aria-hidden="true">...</span>
          <span className="visually-hidden">Jump Previous</span>
        </Button>
      </li>

      {/* Prev Page */}
      <li className="pagination-item">
        <button
          type="button"
          onClick={() => onPaginationAction(PaginationActionEnum.Prev)}
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
          ariaLabel={`Page ${page} of ${totalPageCount}`}
          ariaDescribedby={page === currentPage}
        />
      ))}

      {/* Next Page */}
      <li className="pagination-item">
        <button
          type="button"
          onClick={() => onPaginationAction(PaginationActionEnum.Next)}
          disabled={currentPage === totalPageCount}
        >
          Next
        </button>
      </li>

      {/* Jump Next */}
      {currentPage < totalPageCount - pageLimit && (
        <li className="pagination-item">
          <button
            type="button"
            onClick={() =>
              onPaginationAction(PaginationActionEnum.NextPaginationItem)
            }
          >
            Jump Next
          </button>
        </li>
      )}

      {/* Last Page */}
      <li className="pagination-item">
        <button
          type="button"
          onClick={() => onPaginationAction(PaginationActionEnum.Last)}
          disabled={currentPage === totalPageCount}
        >
          {totalPageCount}
        </button>
      </li>
    </ul>
  </article>
);

export default Pagination;
