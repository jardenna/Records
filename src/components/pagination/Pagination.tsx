import { FC } from 'react';
import Button from '../Button';
import Icon, { IconName } from '../icons/Icon';
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
          <Icon
            name={IconName.ChevronsLeft}
            title="Go to first page"
            ariaHidden
          />
          First
        </button>
      </li>
      {/* Prev Page */}
      <li className="pagination-item">
        <button
          type="button"
          onClick={() => onPaginationAction(PaginationActionEnum.Prev)}
          disabled={currentPage === 1}
        >
          <Icon
            name={IconName.ChevronLeft}
            title="Go to prev page"
            ariaHidden
          />
          Prev
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

      {/* Page Numbers */}
      {pageRange.map((page) => (
        <PaginationItems
          key={page}
          onSetCurrentPage={onPaginationItemClick}
          paginationCount={page}
          ariaLabel={`Page ${page} of ${totalPageCount}`}
          isBtnSelected={page === currentPage}
          ariaDescribedby="current-status"
        />
      ))}

      {/* Jump Next */}
      {currentPage < totalPageCount - pageLimit && (
        <li className="pagination-item">
          <Button
            onClick={() =>
              onPaginationAction(PaginationActionEnum.NextPaginationItem)
            }
          >
            <span aria-hidden="true">...</span>
            <span className="visually-hidden">Jump Next</span>
          </Button>
        </li>
      )}

      {/* Next Page */}
      <li className="pagination-item">
        <button
          type="button"
          onClick={() => onPaginationAction(PaginationActionEnum.Next)}
          disabled={currentPage === totalPageCount}
        >
          Next{' '}
          <Icon
            name={IconName.ChevronRight}
            title="Go to next page"
            ariaHidden
          />
        </button>
      </li>
      {/* Last Page */}
      <li className="pagination-item">
        <button
          type="button"
          onClick={() => onPaginationAction(PaginationActionEnum.Last)}
          disabled={currentPage === totalPageCount}
        >
          Last
          <Icon
            name={IconName.ChevronsRight}
            title="Go to last page"
            ariaHidden
          />
        </button>
      </li>
    </ul>
  </article>
);

export default Pagination;
