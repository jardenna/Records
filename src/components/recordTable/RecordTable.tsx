import { FC } from 'react';
import { Record } from '../../app/api/apiTypes';
import { LabelKeys } from '../../types/enums';
import Table from './Table';
import { labels } from './tableHeaders';

interface RecordTableProps {
  records: Record[];
}

const RecordTable: FC<RecordTableProps> = ({ records }) => (
  <Table
    caption="Record collection"
    headers={labels}
    tableData={records}
    excludeKeys={
      [
        LabelKeys.Id,
        LabelKeys.Cover,
        LabelKeys.Info,
        LabelKeys.RecordNo,
        LabelKeys.Released,
        LabelKeys.Photo,
        LabelKeys.NumOfRecords,
      ] as (keyof Record)[]
    }
  />
);

export default RecordTable;
