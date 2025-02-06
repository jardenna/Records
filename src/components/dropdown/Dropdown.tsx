import { FC, useState } from 'react';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import IconContent from '../IconContent';
import { IconName } from '../icons/Icon';
import './_dropdown.scss';

interface DropdownProps {
  btnLabel: string;
  iconName: IconName;
  iconTitle: string;
  onClick: () => void;
  btnVariant?: BtnVariant;
  info?: string;
}

const Dropdown: FC<DropdownProps> = ({
  btnLabel,
  iconName,
  iconTitle,
  btnVariant = BtnVariant.Ghost,
  info,
  onClick,
}) => {
  const [isDropdownOpen, setIssDropdownOpen] = useState(false);
  return (
    <div className="test">
      <Button
        variant={btnVariant}
        onClick={() => setIssDropdownOpen(!isDropdownOpen)}
      >
        <IconContent iconName={iconName} title={iconTitle} />{' '}
        {info && <span>{info}</span>}
      </Button>
      {isDropdownOpen && (
        <Button onClick={onClick} className="dropdown">
          {btnLabel}
        </Button>
      )}
    </div>
  );
};

export default Dropdown;
