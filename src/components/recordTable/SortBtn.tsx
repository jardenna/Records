import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import Icon, { IconName } from '../icons/Icon';

interface SortBtnProps {
  showIcon: boolean;
  sortOrder: string;
  title: string;
  onSort: (id: string) => void;
}

const SortBtn: FC<SortBtnProps> = ({ onSort, title, showIcon, sortOrder }) => {
  const { language } = useLanguage();

  return (
    <Button
      variant={BtnVariant.Ghost}
      onClick={() => {
        onSort(title);
      }}
    >
      {language[title]}
      {showIcon && (
        <Icon
          size="16"
          iconName={
            sortOrder === 'desc' ? IconName.ArrowDown : IconName.ArrowUp
          }
          title={`${language.sortBy} ${language[title]}`}
        />
      )}
    </Button>
  );
};

export default SortBtn;
