import { FC } from 'react';
import Button from '../Button';

interface PaginationItemsProps {
  ariaLabel: string;
  onSetCurrentPage: (pageNo: number) => void;
  paginationCount: number;
  ariaDescribedby?: string;
  isBtnSelected?: boolean;
}

const PaginationItems: FC<PaginationItemsProps> = ({
  onSetCurrentPage,
  paginationCount,
  ariaLabel,
  isBtnSelected,
  ariaDescribedby,
}) => (
  <li className="pagination-item">
    <Button
      ariaLabel={ariaLabel}
      className={`${isBtnSelected ? 'active' : ''}`}
      onClick={() => onSetCurrentPage(paginationCount)}
      isBtnSelected={isBtnSelected}
      ariaDescribedby={ariaDescribedby}
    >
      {paginationCount}
      {isBtnSelected && (
        <span id={ariaDescribedby} className="visually-hidden">
          Currently selected
        </span>
      )}
    </Button>
  </li>
);

export default PaginationItems;
