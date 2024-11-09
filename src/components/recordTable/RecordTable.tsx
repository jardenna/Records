import { FC } from 'react';
import { Record } from '../../app/api/apiTypes';
import Table from './Table';
import { labels } from './tableHeaders';

interface RecordTableProps {
  records: Record[];
}

const RecordTable: FC<RecordTableProps> = ({ records }) => (
  <Table
    headers={labels}
    data={records}
    excludeKeys={
      [
        'id',
        'cover',
        'info',
        'recordNo',
        'released',
        'numOfRecords',
        'photo',
      ] as (keyof Record)[]
    }
  />
);

export default RecordTable;
