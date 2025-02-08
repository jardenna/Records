import { FC, ReactNode } from 'react';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';

interface DropdownTriggerProps {
  children: ReactNode;
  className: string;
  onClick: () => void;
  btnVariant?: BtnVariant;
}

const DropdownTrigger: FC<DropdownTriggerProps> = ({
  btnVariant,
  children,
  className,
  onClick,
}) => (
  <Button variant={btnVariant} onClick={onClick} className={className}>
    {children}
  </Button>
);

export default DropdownTrigger;
