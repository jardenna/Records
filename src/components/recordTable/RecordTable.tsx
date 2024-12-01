import { FC } from 'react';
import { Records } from '../../app/api/apiTypes';
import { LabelKeys } from '../../types/enums';
import Table from './Table';
import { labels } from './tableHeaders';

interface RecordTableProps {
  records: Records[];
}

const RecordTable: FC<RecordTableProps> = ({ records }) => (
  <Table
    caption="Records collection"
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
        LabelKeys.Price,
      ] as (keyof Records)[]
    }
  />
);

export default RecordTable;
