import { FC, ReactNode, useState } from 'react';
import useKeyPress from '../../hooks/useKeyPress';
import { BtnVariant, KeyCode } from '../../types/enums';
import Button from '../Button';
import IconContent from '../IconContent';
import { IconName } from '../icons/Icon';
import { PrimaryActionBtnProps } from '../modal/Modal';
import './_dropdown.scss';

interface DropdownProps {
  actionBtn: PrimaryActionBtnProps;
  children: ReactNode;
  iconName: IconName;
  iconTitle: string;
  btnVariant?: BtnVariant;
  info?: string;
}

const Dropdown: FC<DropdownProps> = ({
  actionBtn,
  children,
  iconName,
  iconTitle,
  btnVariant = BtnVariant.Ghost,
  info,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useKeyPress(() => setIsDropdownOpen(false), [KeyCode.Esc]);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCloseDropdown = () => {
    actionBtn.onClick();
    setIsDropdownOpen(false);
  };

  return (
    <div className="dropdown-container">
      <Button
        variant={btnVariant}
        onClick={handleToggleDropdown}
        className="user-btn"
      >
        <IconContent iconName={iconName} title={iconTitle} />{' '}
        {info && <span>{info}</span>}
      </Button>
      {isDropdownOpen && (
        <section className="dropdown">
          {children}
          <Button onClick={handleCloseDropdown}>{actionBtn.label}</Button>
        </section>
      )}
    </div>
  );
};

export default Dropdown;
