import { FC } from 'react';
import { BtnVariant } from '../types/enums';
import Button from './Button';

interface BtnCloseProps {
  ariaLabel: string;
  autoFocus?: boolean;
  className?: string;
  onClick?: () => void;
}

const BtnClose: FC<BtnCloseProps> = ({
  onClick,
  ariaLabel,
  autoFocus,
  className = '',
}) => (
  <Button
    variant={BtnVariant.Ghost}
    onClick={onClick}
    ariaLabel={ariaLabel}
    autoFocus={autoFocus}
    className={`btn-focus ${className}`}
  >
    Close
  </Button>
);

export default BtnClose;
