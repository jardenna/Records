import { FC } from 'react';
import { BtnVariant } from '../types/enums';
import Button from './Button';
import IconContent from './IconContent';
import { IconName } from './icons/Icon';

interface IconBtnProps {
  ariaLabel: string;
  iconName: IconName;
  onClick: () => void;
  title: string;
  ariaSelected?: boolean;
  className?: string;
}

const IconBtn: FC<IconBtnProps> = ({
  ariaLabel,
  iconName,
  title,
  onClick,
  className = '',
  ariaSelected,
}) => (
  <Button
    variant={BtnVariant.Ghost}
    onClick={onClick}
    className={className}
    ariaSelected={ariaSelected}
  >
    <IconContent iconName={iconName} title={title} ariaLabel={ariaLabel} />
  </Button>
);

export default IconBtn;
