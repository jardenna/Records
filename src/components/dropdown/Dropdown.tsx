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

  const handleCallback = () => {
    actionBtn.onClick();
    onHidePanel();
  };
  const myRef = useRef<HTMLDivElement>(null);
  useClickOutside(myRef, () => onHidePanel());
  return (
    <div className="dropdown-container">
      <DropdownTrigger
        btnVariant={btnVariant}
        onClick={onTogglePanel}
        className="user-btn"
      >
        {triggerContent}
      </DropdownTrigger>

      {!isPanelHidden && (
        <section className="dropdown" ref={myRef}>
          {children}
          <Button onClick={handleCallback}>{actionBtn.label}</Button>
        </section>
      )}
    </div>
  );
};

export default Dropdown;
