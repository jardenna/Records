import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../icons/Icon';
import './_pagination.scss';
import PaginationContent from './PaginationContent';
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
            <PaginationContent
              iconName={IconName.ChevronsLeft}
              title={language.gotoFirstPage}
            />
          }
        />

        {/* Prev Page */}
        <PaginationItem
          onSetCurrentPage={() => onPaginationAction(PaginationActionEnum.Prev)}
          disabled={currentPage === 1}
          content={
            <PaginationContent
              iconName={IconName.ChevronLeft}
              title={language.gotoPrevPage}
            />
          }
        />

        {/* Jump Previous */}
        <PaginationItem
          disabled={currentPage < pageLimit}
          onSetCurrentPage={() =>
            onPaginationAction(PaginationActionEnum.PrevPaginationItem)
          }
          content={
            <PaginationContent
              iconName={IconName.More}
              title={language.jumpPagesBack}
            />
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
            <PaginationContent
              iconName={IconName.More}
              title={language.jumpPagesForth}
            />
          }
        />

        {/* Next Page */}
        <PaginationItem
          onSetCurrentPage={() => onPaginationAction(PaginationActionEnum.Next)}
          disabled={currentPage === totalPageCount}
          content={
            <PaginationContent
              iconName={IconName.ChevronRight}
              title={language.gotoNextPage}
            />
          }
        />

        {/* Last Page */}
        <PaginationItem
          onSetCurrentPage={() => onPaginationAction(PaginationActionEnum.Last)}
          disabled={currentPage === totalPageCount}
          className="last-pagination-item"
          content={
            <PaginationContent
              iconName={IconName.ChevronsRight}
              title={language.gotoLastPage}
            />
          }
        />
      </ul>
    </article>
  );
};

export default Pagination;
