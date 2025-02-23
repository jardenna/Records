import { FC, ReactNode } from 'react';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';

interface PaginationItemProps {
  onSetCurrentPage: () => void;
  ariaDescribedby?: string;
  ariaLabel?: string;
  className?: string;
  content?: ReactNode;
  disabled?: boolean;
  isBtnSelected?: boolean;
  paginationCount?: number;
}

const PaginationItem: FC<PaginationItemProps> = ({
  content,
  onSetCurrentPage,
  paginationCount,
  ariaLabel,
  isBtnSelected,
  ariaDescribedby,
  disabled,
  className = '',
}) => (
  <li className="pagination-item">
    <Button
      variant={BtnVariant.Ghost}
      disabled={disabled}
      ariaLabel={ariaLabel}
      className={`${isBtnSelected ? 'active' : ''} ${className}`}
      onClick={onSetCurrentPage}
      ariaSelected={isBtnSelected}
      ariaDescribedby={ariaDescribedby}
    >
      <span className="pagination-item-content">
        {content || paginationCount}
      </span>
    </Button>
  </li>
);

export default PaginationItem;
