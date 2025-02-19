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
  className?: string;
}

const IconBtn: FC<IconBtnProps> = ({
  ariaLabel,
  iconName,
  title,
  onClick,
  className = '',
}) => (
  <Button
    variant={BtnVariant.Ghost}
    onClick={onClick}
    className={className}
    ariaLabel={ariaLabel}
  >
    <IconContent iconName={iconName} title={title} />
  </Button>
);

export default IconBtn;
