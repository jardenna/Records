import { FC } from 'react';

interface PaginationItemsProps {
  currentPage: number;
  onSetCurrentPage: (pageNo: number) => void;
  paginationCount: number;
}

const PaginationItems: FC<PaginationItemsProps> = ({
  onSetCurrentPage,
  paginationCount,
  currentPage,
}) => (
  <li className="pagination-item">
    <button
      type="button"
      className={` ${currentPage === paginationCount ? 'active' : ''}`}
      onClick={() => onSetCurrentPage(paginationCount)}
    >
      {paginationCount}
    </button>
  </li>
);

export default PaginationItems;
