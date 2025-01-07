import { FC } from 'react';
import { BtnVariant } from '../types/enums';
import { ButtonEventType } from '../types/types';
import Button from './Button';
import IconContent from './IconContent';
import { IconName } from './icons/Icon';

interface IconBtnProps {
  iconName: IconName;
  onClick: (id?: string | ButtonEventType) => void;
  title: string;
  className?: string;
}

const IconBtn: FC<IconBtnProps> = ({
  iconName,
  title,
  onClick,
  className = '',
}) => (
  <Button variant={BtnVariant.Ghost} onClick={onClick} className={className}>
    <IconContent iconName={iconName} title={title} />
  </Button>
);

export default IconBtn;
