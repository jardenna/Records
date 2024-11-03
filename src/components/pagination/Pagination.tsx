import { FC } from 'react';
import './_pagination.scss';
import PaginationItems from './PaginationItems';

export interface PaginationProps {
  currentPage: number;
  onSetCurrentPage: (pageNo: number) => void;
  roundedPaginationCount: number;
}

const Pagination: FC<PaginationProps> = ({
  onSetCurrentPage,
  roundedPaginationCount,
  currentPage,
}) => {
  const pageRange = Array.from(
    { length: roundedPaginationCount },
    (_, i) => i + 1,
  );

  return (
    <article>
      <ul className="pagination">
        {pageRange.map((paginationCount) => (
          <PaginationItems
            key={paginationCount}
            onSetCurrentPage={onSetCurrentPage}
            paginationCount={paginationCount}
            currentPage={currentPage}
          />
        ))}
      </ul>
    </article>
  );
};

export default Pagination;
