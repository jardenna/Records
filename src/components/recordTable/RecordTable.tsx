import { FC } from 'react';
import { Records } from '../../app/api/apiTypes';
import { LabelKeys } from '../../types/enums';
import Table from './Table';
import { labels } from './tableHeaders';

interface RecordTableProps {
  onSort: (field: string) => void;
  records: Records[];
  searchParams: string;
  sortField: string;
  sortOrder: string;
}

const RecordTable: FC<RecordTableProps> = ({
  records,
  onSort,
  searchParams,
  sortField,
  sortOrder,
}) => (
  <Table
    searchParams={searchParams}
    caption="Records collection"
    headers={labels}
    tableData={records}
    onSort={onSort}
    sortOrder={sortOrder}
    sortField={sortField}
    excludeKeys={
      [
        LabelKeys.Id,
        LabelKeys.Cover,
        LabelKeys.Info,
        LabelKeys.RecordNo,
        LabelKeys.Released,
        LabelKeys.Photo,
        LabelKeys.NumOfRecords,
        LabelKeys.Price,
      ] as (keyof Records)[]
    }
  />
);

export default RecordTable;
