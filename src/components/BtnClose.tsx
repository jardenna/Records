import { FC } from 'react';
import { BtnVariant } from '../types/enums';
import Button from './Button';
import Icon, { IconName } from './icons/Icon';

interface BtnCloseProps {
  onClick: any;
  ariaLabel?: string;
  autoFocus?: boolean;
}

const BtnClose: FC<BtnCloseProps> = ({
  onClick,
  ariaLabel = 'Close',
  autoFocus,
}) => (
  <Button
    variant={BtnVariant.Ghost}
    onClick={onClick}
    ariaLabel={ariaLabel}
    autoFocus={autoFocus}
    className="btn-close"
  >
    <Icon name={IconName.Close} title="Close" />
  </Button>
);

export default BtnClose;
