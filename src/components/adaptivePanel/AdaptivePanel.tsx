import { FC, ReactNode, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
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
}) => {
  const { isPanelHidden, onTogglePanel, onHidePanel } = usePanel();
  const panelRef = useRef<HTMLDivElement>(null);
  const ariaControls = !isPanel ? 'dropdown' : 'panel';

  useClickOutside(panelRef, () => onHidePanel());

  const handleCallback = () => {
    actionBtn.onClick();
    onHidePanel();
  };

  return (
    <div className="dropdown-container">
      <DropdownTrigger
        btnVariant={btnVariant}
        onClick={onTogglePanel}
        className="user-btn"
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
          ref={panelRef}
        >
          {children}
        </Dropdown>
      )}

      {isPanel && (
        <Panel
          id={ariaControls}
          isPanelHidden={isPanelHidden}
          ref={panelRef}
          variant={panelVariant}
        >
          {children}
        </Panel>
      )}
    </div>
  );
};

export default AdaptivePanel;
