import { FC, ReactNode } from 'react';
import { BtnVariant } from '../../types/enums';
import { PrimaryActionBtnProps } from '../modal/Modal';
import './_dropdown.scss';
import DropdownTrigger from './AdaptivePanelTrigger';
import Dropdown from './Dropdown';
import Panel, { Variant } from './Panel';
import usePanel from './useAdaptivePanel';

interface AdaptivePanelProps {
  actionBtn: PrimaryActionBtnProps;
  children: ReactNode;
  btnVariant?: BtnVariant;
  className?: string;
  isPanel?: boolean;
  panelVariant?: Variant;
  triggerContent?: ReactNode;
}

const AdaptivePanel: FC<AdaptivePanelProps> = ({
  actionBtn,
  children,
  btnVariant = BtnVariant.Ghost,
  triggerContent,
  isPanel,
  panelVariant,
  className = 'user-btn',
}) => {
  const { isPanelHidden, onTogglePanel, onHidePanel, panelRef } = usePanel();
  const ariaControls = !isPanel ? 'dropdown' : 'panel';

  const handleCallback = () => {
    actionBtn.onClick();
    onHidePanel();
  };

  return (
    <div className="dropdown-container" ref={panelRef}>
      <DropdownTrigger
        btnVariant={btnVariant}
        onClick={onTogglePanel}
        className={className}
        ariaExpanded={!isPanelHidden}
        ariaControls={ariaControls}
      >
        {triggerContent}
      </DropdownTrigger>

      {!isPanelHidden && !isPanel && (
        <Dropdown
          id={ariaControls}
          handleCallback={handleCallback}
          btnLabel={actionBtn.label ?? ''}
        >
          {children}
        </Dropdown>
      )}

      {isPanel && (
        <Panel
          id={ariaControls}
          isPanelHidden={isPanelHidden}
          variant={panelVariant}
        >
          {children}
        </Panel>
      )}
    </div>
  );
};

export default AdaptivePanel;
