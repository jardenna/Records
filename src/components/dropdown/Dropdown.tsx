import { FC, ReactNode, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import { PrimaryActionBtnProps } from '../modal/Modal';
import usePanel from '../panel/usePanel';
import './_dropdown.scss';
import DropdownTrigger from './DropdownTrigger';

interface DropdownProps {
  actionBtn: PrimaryActionBtnProps;
  children: ReactNode;
  btnVariant?: BtnVariant;
  triggerContent?: ReactNode;
}

const Dropdown: FC<DropdownProps> = ({
  actionBtn,
  children,
  btnVariant = BtnVariant.Ghost,
  triggerContent,
}) => {
  const { isPanelHidden, onTogglePanel, onHidePanel } = usePanel();
  const panelRef = useRef<HTMLDivElement>(null);
  const ariaControls = 'dropdown';

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

      {!isPanelHidden && (
        <section className="dropdown" ref={panelRef} id={ariaControls}>
          {children}
          <Button onClick={handleCallback}>{actionBtn.label}</Button>
        </section>
      )}
    </div>
  );
};

export default Dropdown;
