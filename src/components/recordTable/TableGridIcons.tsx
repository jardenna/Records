import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import IconBtn from '../IconBtn';
import { IconName } from '../icons/Icon';
import './scss/_table-grid-icons.scss';

interface TableGridIconList {
  iconName: IconName;
  padding: number;
  title: string;
}

interface TableGridIconsProps {
  isActive: number;
  onSetPadding: (id: number) => void;
  tableGridIconList: TableGridIconList[];
}

const TableGridIcons: FC<TableGridIconsProps> = ({
  tableGridIconList,
  onSetPadding,
  isActive,
}) => {
  const { language } = useLanguage();
  return (
    <div className="table-grid-icons">
      {tableGridIconList.map(({ padding, iconName, title }) => (
        <IconBtn
          key={padding}
          iconName={iconName}
          title={language[title]}
          onClick={() => onSetPadding(padding)}
          className={isActive === padding ? 'is-active' : ''}
        />
      ))}
    </div>
  );
};

export default TableGridIcons;
