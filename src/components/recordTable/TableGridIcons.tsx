import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import IconBtn from '../IconBtn';
import { IconName } from '../icons/Icon';

interface TableGridIconList {
  iconName: IconName;
  padding: number;
  title: string;
}

interface TableGridIconsProps {
  isActive: number;
  onPadding: (id: number) => void;
  tableGridIconList: TableGridIconList[];
}

const TableGridIcons: FC<TableGridIconsProps> = ({
  tableGridIconList,
  onPadding,
  isActive,
}) => {
  const { language } = useLanguage();
  return (
    <div className="actions">
      {tableGridIconList.map(({ padding, iconName, title }) => (
        <IconBtn
          key={padding}
          iconName={iconName}
          title={language[title]}
          onClick={() => onPadding(padding)}
          className={isActive === padding ? 'is-active' : ''}
        />
      ))}
    </div>
  );
};

export default TableGridIcons;
