import { FC, ReactNode, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import { PrimaryActionBtnProps } from '../modal/Modal';
import './_dropdown.scss';
import DropdownTrigger from './DropdownTrigger';
import Panel, { Variant } from './Panel';
import usePanel from './usePanel';

interface DropdownProps {
  actionBtn: PrimaryActionBtnProps;
  children: ReactNode;
  btnVariant?: BtnVariant;
  isDropdown?: boolean;
  panelVariant?: Variant;
  triggerContent?: ReactNode;
}

const Dropdown: FC<DropdownProps> = ({
  actionBtn,
  children,
  btnVariant = BtnVariant.Ghost,
  triggerContent,
  isDropdown = false,
  panelVariant,
}) => {
  const { isPanelHidden, onTogglePanel, onHidePanel } = usePanel();
  const panelRef = useRef<HTMLDivElement>(null);
  const ariaControls = isDropdown ? 'dropdown' : 'panel';

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

      {!isPanelHidden && isDropdown && (
        <section className="dropdown" ref={panelRef} id={ariaControls}>
          {children}
          <Button onClick={handleCallback}>{actionBtn.label}</Button>
        </section>
      )}

      {!isDropdown && (
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

export default Dropdown;
