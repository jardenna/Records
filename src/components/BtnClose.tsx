import { FC } from 'react';
import { BtnVariant } from '../types/enums';
import Button from './Button';
import Icon, { IconName } from './icons/Icon';

interface BtnCloseProps {
  ariaLabel: string;
  autoFocus?: boolean;
  onClick?: () => void;
}

const BtnClose: FC<BtnCloseProps> = ({ onClick, ariaLabel, autoFocus }) => (
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
