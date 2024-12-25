import { FC } from 'react';
import { Records } from '../../app/api/apiTypes';
import { LabelKeys } from '../../types/enums';
import Table from './Table';
import { labels } from './tableHeaders';

interface RecordTableProps {
  onSort: any;
  records: Records[];
}

const RecordTable: FC<RecordTableProps> = ({ records, onSort }) => (
  <Table
    caption="Records collection"
    headers={labels}
    tableData={records}
    onSort={onSort}
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
