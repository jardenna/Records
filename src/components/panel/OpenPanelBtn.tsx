import { FC, ReactNode } from 'react';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';

interface OpenPanelBtnProps {
  ariaLabel: string;
  children: ReactNode;
  isPanelHidden: boolean;
  onTogglePanel: () => void;
  ariaControls?: string;
  className?: string;
}

const OpenPanelBtn: FC<OpenPanelBtnProps> = ({
  ariaLabel,
  ariaControls,
  children,
  isPanelHidden,
  onTogglePanel,
  className = '',
}) => (
  <Button
    ariaLabel={ariaLabel}
    ariaExpanded={!isPanelHidden}
    variant={BtnVariant.Ghost}
    onClick={onTogglePanel}
    className={className}
    ariaControls={ariaControls}
  >
    {children}
  </Button>
);
export default OpenPanelBtn;
