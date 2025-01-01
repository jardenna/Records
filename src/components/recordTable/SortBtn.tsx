import { FC } from 'react';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import Icon, { IconName } from '../icons/Icon';

interface SortBtnProps {
  onSort: any;
  showIcon: boolean;
  sortOrder: string;
  title: string;
}

const SortBtn: FC<SortBtnProps> = ({ onSort, title, showIcon, sortOrder }) => (
  <Button variant={BtnVariant.Ghost} onClick={onSort}>
    {title}
    {showIcon && (
      <Icon
        size="16"
        name={sortOrder === 'desc' ? IconName.ArrowDown : IconName.ArrowUp}
        title={`Sort by ${title}`}
      />
    )}
  </Button>
);

export default SortBtn;
