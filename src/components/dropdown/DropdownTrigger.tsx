import { FC, ReactNode } from 'react';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';

interface DropdownTriggerProps {
  ariaControls: string;
  ariaExpanded: boolean;
  children: ReactNode;
  className: string;
  onClick: () => void;
  ariaLabel?: string;
  btnVariant?: BtnVariant;
}

const DropdownTrigger: FC<DropdownTriggerProps> = ({
  btnVariant,
  children,
  className,
  onClick,
  ariaLabel,
  ariaControls,
  ariaExpanded,
}) => (
  <Button
    variant={btnVariant}
    onClick={onClick}
    className={className}
    ariaLabel={ariaLabel}
    ariaExpanded={ariaExpanded}
    ariaControls={ariaControls}
  >
    {children}
  </Button>
);

export default DropdownTrigger;
