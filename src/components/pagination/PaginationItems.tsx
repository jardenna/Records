import { FC } from 'react';
import Button from '../Button';

interface PaginationItemsProps {
  ariaLabel: string;
  currentPage: number;
  onSetCurrentPage: (pageNo: number) => void;
  paginationCount: number;
  ariaDescribedby?: boolean;
}

const PaginationItems: FC<PaginationItemsProps> = ({
  onSetCurrentPage,
  paginationCount,
  currentPage,
  ariaLabel,
  ariaDescribedby,
}) => (
  <li className="pagination-item">
    <Button
      ariaLabel={ariaLabel}
      className={` ${currentPage === paginationCount ? 'active' : ''}`}
      onClick={() => onSetCurrentPage(paginationCount)}
      ariaDescribedby={ariaDescribedby}
    >
      {paginationCount}
      {ariaDescribedby && (
        <span id="current-status" className="visually-hidden">
          Currently selected
        </span>
      )}
    </Button>
  </li>
);

export default PaginationItems;
