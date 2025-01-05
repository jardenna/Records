import { FC } from 'react';
import Icon, { IconName } from '../icons/Icon';
import VisuallyHidden from '../VisuallyHidden';
import './_pagination.scss';
import PaginationItem from './PaginationItem';
import { PaginationActionEnum } from './usePagination';

interface PaginationProps {
  currentPage: number;
  onPaginationAction: (action: PaginationActionEnum) => void;
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
      <PaginationItem
        onSetCurrentPage={() => onPaginationAction(PaginationActionEnum.First)}
        disabled={currentPage === 1}
        content={
          <>
            <Icon
              name={IconName.ChevronsLeft}
              title="Go to first page"
              ariaHidden
            />
            <VisuallyHidden>Go to first page</VisuallyHidden>
          </>
        }
      />

      {/* Prev Page */}
      <PaginationItem
        onSetCurrentPage={() => onPaginationAction(PaginationActionEnum.Prev)}
        disabled={currentPage === 1}
        content={
          <>
            <Icon
              name={IconName.ChevronLeft}
              title="Go to prev page"
              ariaHidden
            />
            <VisuallyHidden>Go to previous page</VisuallyHidden>
          </>
        }
      />

      {/* Jump Previous */}
      <PaginationItem
        disabled={currentPage < pageLimit}
        onSetCurrentPage={() =>
          onPaginationAction(PaginationActionEnum.PrevPaginationItem)
        }
        content={
          <>
            <span aria-hidden="true">...</span>
            <VisuallyHidden>Go to previous page</VisuallyHidden>
          </>
        }
      />

      {/* Page Numbers */}
      {pageRange.map((page) => (
        <PaginationItem
          key={page}
          onSetCurrentPage={() => onPaginationItemClick(page)}
          paginationCount={page}
          ariaLabel={`Page ${page} of ${totalPageCount}`}
          isBtnSelected={page === currentPage}
          ariaDescribedby="current-status"
          disabled={page === currentPage}
        />
      ))}

      {/* Jump Next */}
      <PaginationItem
        onSetCurrentPage={() =>
          onPaginationAction(PaginationActionEnum.NextPaginationItem)
        }
        disabled={currentPage > totalPageCount - pageLimit}
        content={
          <>
            <span aria-hidden="true">...</span>
            <VisuallyHidden>Go to next page</VisuallyHidden>
          </>
        }
      />

      {/* Next Page */}
      <PaginationItem
        onSetCurrentPage={() => onPaginationAction(PaginationActionEnum.Next)}
        disabled={currentPage === totalPageCount}
        content={
          <>
            Next
            <Icon
              name={IconName.ChevronRight}
              title="Go to next page"
              ariaHidden
            />
          </>
        }
      />

      {/* Last Page */}
      <PaginationItem
        onSetCurrentPage={() => onPaginationAction(PaginationActionEnum.Last)}
        disabled={currentPage === totalPageCount}
        className="last-pagination-item"
        content={
          <>
            Last
            <Icon
              name={IconName.ChevronsRight}
              title="Go to last page"
              ariaHidden
            />
          </>
        }
      />
    </ul>
  </article>
);

export default Pagination;
