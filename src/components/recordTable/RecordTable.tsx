import { FC } from 'react';
import { Records } from '../../app/api/apiTypes';
import Table from './Table';

interface RecordTableProps {
  onSort: (field: string) => void;
  records: Records[];
  searchParams: string;
  sortField: string;
  sortOrder: string;
}

const tableHeaders = ['artist', 'title', 'prodYear', 'label', 'origin'];

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
    headers={tableHeaders}
    tableData={records}
    onSort={onSort}
    sortOrder={sortOrder}
    sortField={sortField}
  />
);

export default RecordTable;
