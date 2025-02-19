import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import IconBtn from '../iconBtn/IconBtn';
import { IconName } from '../icons/Icon';
import './scss/_table-actions.scss';

interface TableActionHeaderProps {
  onClearAllSearch: () => void;
}

const TableActionHeader: FC<TableActionHeaderProps> = ({
  onClearAllSearch,
}) => {
  const { language } = useLanguage();

  return (
    <th>
      <div className="table-action-header">
        {language.actions}
        <IconBtn
          iconName={IconName.Undo}
          title={language.resetFiltersAndSorting}
          ariaLabel={language.resetFiltersAndSorting}
          onClick={onClearAllSearch}
        />
      </div>
    </th>
  );
};

export default TableActionHeader;
