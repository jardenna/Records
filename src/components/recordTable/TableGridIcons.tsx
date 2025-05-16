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
  tableGridIconList: TableGridIconList[];
  onSetPadding: (id: number) => void;
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
          ariaLabel={language[title]}
          onClick={() => {
            onSetPadding(padding);
          }}
          className={isActive === padding ? 'is-active' : ''}
          ariaSelected={isActive === padding}
        />
      ))}
    </div>
  );
};

export default TableGridIcons;
