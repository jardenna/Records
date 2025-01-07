import { FC } from 'react';
import { BtnVariant } from '../types/enums';
import Button from './Button';
import Icon, { IconName } from './icons/Icon';
import VisuallyHidden from './VisuallyHidden';

interface IconBtnProps {
  iconName: IconName;
  onClick: any;
  title: string;
}

const IconBtn: FC<IconBtnProps> = ({ iconName, title, onClick }) => (
  <Button variant={BtnVariant.Ghost} onClick={onClick}>
    <Icon name={iconName} title={title} ariaHidden />
    <VisuallyHidden>{title}</VisuallyHidden>
  </Button>
);

export default IconBtn;
