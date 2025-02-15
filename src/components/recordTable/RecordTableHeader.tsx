import { FC } from 'react';
import { ChangeInputType } from '../../types/types';
import SearchField from './SearchField';
import SortBtn from './SortBtn';
import './scss/_table-action-header.scss';

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
  <th scope="col">
    <div className="table-action-header">
      <SortBtn
        onSort={onSort}
        showIcon={showIcon}
        sortOrder={sortOrder}
        title={title}
      />

      <SearchField onFilterRows={onFilterRows} title={title} value={value} />
    </div>
  </th>
);

export default RecordTableHeader;
