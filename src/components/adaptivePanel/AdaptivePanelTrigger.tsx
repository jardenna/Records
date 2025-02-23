import { FC, ReactNode } from 'react';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';

interface AdaptivePanelTriggerProps {
  ariaControls: string;
  ariaExpanded: boolean;
  children: ReactNode;
  className: string;
  onClick: () => void;
  ariaLabel?: string;
  btnVariant?: BtnVariant;
}

const AdaptivePanelTrigger: FC<AdaptivePanelTriggerProps> = ({
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

export default AdaptivePanelTrigger;
