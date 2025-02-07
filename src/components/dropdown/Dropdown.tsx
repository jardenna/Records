import { FC, ReactNode, useState } from 'react';
import Button from '../Button';
import IconContent from '../IconContent';
import { IconName } from '../icons/Icon';
import './_dropdown.scss';
import { BtnVariant } from '../../types/enums';

interface DropdownProps {
  children: ReactNode;
  iconName: IconName;
  iconTitle: string;
  btnVariant?: BtnVariant;
  info?: string;
}

const Dropdown: FC<DropdownProps> = ({
  children,
  iconName,
  iconTitle,
  btnVariant = BtnVariant.Ghost,
  info,
}) => {
  const [isDropdownOpen, setIssDropdownOpen] = useState(false);
  return (
    <div className="dropdown-container">
      <Button
        variant={btnVariant}
        onClick={() => setIssDropdownOpen(!isDropdownOpen)}
        className="user-btn"
      >
        <IconContent iconName={iconName} title={iconTitle} />{' '}
        {info && <span>{info}</span>}
      </Button>
      {isDropdownOpen && <section className="dropdown">{children}</section>}
    </div>
  );
};

export default Dropdown;
