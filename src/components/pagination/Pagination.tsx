import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
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
}) => {
  const { language } = useLanguage();

  return (
    <article>
      <ul className="pagination">
        {/* First Page */}
        <PaginationItem
          onSetCurrentPage={() =>
            onPaginationAction(PaginationActionEnum.First)
          }
          disabled={currentPage === 1}
          content={
            <>
              <Icon
                name={IconName.ChevronsLeft}
                title={language.gotoFirstPage}
                ariaHidden
              />
              <VisuallyHidden>{language.gotoFirstPage}</VisuallyHidden>
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
                title={language.gotoPrevPage}
                ariaHidden
              />
              <VisuallyHidden>{language.gotoPrevPage}</VisuallyHidden>
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
              <VisuallyHidden>{language.jumpPagesBack}</VisuallyHidden>
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
              <VisuallyHidden>{language.jumpPagesForth}</VisuallyHidden>
            </>
          }
        />

        {/* Next Page */}
        <PaginationItem
          onSetCurrentPage={() => onPaginationAction(PaginationActionEnum.Next)}
          disabled={currentPage === totalPageCount}
          content={
            <>
              <VisuallyHidden>{language.gotoNextPage}</VisuallyHidden>
              <Icon
                name={IconName.ChevronRight}
                title={language.gotoNextPage}
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
              <VisuallyHidden>{language.gotoLastPage}</VisuallyHidden>
              <Icon
                name={IconName.ChevronsRight}
                title={language.gotoLastPage}
                ariaHidden
              />
            </>
          }
        />
      </ul>
    </article>
  );
};

export default Pagination;
