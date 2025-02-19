import { FC } from 'react';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import { IconName } from '../icons/Icon';
import IconBtnContent from './IconBtnContent';

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
  <Button variant={BtnVariant.Ghost} onClick={onClick} className={className}>
    <IconBtnContent iconName={iconName} title={title} ariaLabel={ariaLabel} />
  </Button>
);

export default IconBtn;
