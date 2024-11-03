import { FC } from 'react';
import './_pagination.scss';

interface PaginationProps {
  onSetCurrentPage: (pageNo: number) => void;
  roundedPaginationCount: number;
}

const Pagination: FC<PaginationProps> = ({
  onSetCurrentPage,
  roundedPaginationCount,
}) => {
  const pageRange = Array.from(
    { length: roundedPaginationCount },
    (_, i) => i + 1,
  );

  return (
    <article>
      <ul className="pagination">
        {pageRange.map((paginationCount) => (
          <li className="pagination-item" key={paginationCount}>
            <button
              type="button"
              onClick={() => onSetCurrentPage(paginationCount)}
            >
              {paginationCount}
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Pagination;
