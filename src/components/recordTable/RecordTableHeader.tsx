import { FC } from 'react';
import { ChangeInputType } from '../../types/types';
import SearchField from './SearchField';
import SortBtn from './SortBtn';
import './scss/_table-actions.scss';

interface RecordTableHeaderProps {
  onFilterRows: (e: ChangeInputType) => void;
  onSort: (id: string) => void;
  showIcon: boolean;
  sortOrder: string;
  title: string;
  value: string;
}

const RecordTableHeader: FC<RecordTableHeaderProps> = ({
  onSort,
  showIcon,
  sortOrder,
  title,
  onFilterRows,
  value,
}) => (
  <div className="table-action-header">
    <SortBtn
      onSort={onSort}
      showIcon={showIcon}
      sortOrder={sortOrder}
      title={title}
    />

    <SearchField onFilterRows={onFilterRows} title={title} value={value} />
  </div>
);

export default RecordTableHeader;
