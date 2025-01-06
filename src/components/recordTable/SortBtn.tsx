import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import Icon, { IconName } from '../icons/Icon';

interface SortBtnProps {
  onSort: any;
  showIcon: boolean;
  sortOrder: string;
  title: string;
}

const SortBtn: FC<SortBtnProps> = ({ onSort, title, showIcon, sortOrder }) => {
  const { language } = useLanguage();

  return (
    <Button variant={BtnVariant.Ghost} onClick={onSort}>
      {language[title]}
      {showIcon && (
        <Icon
          size="16"
          name={sortOrder === 'desc' ? IconName.ArrowDown : IconName.ArrowUp}
          title={`${language.sortBy} ${language[title]}`}
        />
      )}
    </Button>
  );
};

export default SortBtn;
