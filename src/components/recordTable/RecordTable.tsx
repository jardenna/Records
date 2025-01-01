import { FC } from 'react';
import { Records } from '../../app/api/apiTypes';
import { ChangeInputType } from '../../types/types';
import Table from './Table';

interface RecordTableProps {
  onFilterRecords: (e: ChangeInputType) => void;
  onSort: (field: string) => void;
  records: Records[];
  searchParams: string;
  sortOrder: string;
  values: Record<string, string>;
  valuesFromSearch: any;
  className?: string;
}

const tableHeaders = ['artist', 'title', 'prodYear', 'label', 'origin'];

const RecordTable: FC<RecordTableProps> = ({
  records,
  onSort,
  searchParams,
  sortOrder,
  onFilterRecords,
  values,
  valuesFromSearch,
  className,
}) => (
  <Table
    searchParams={searchParams}
    caption="Records collection"
    headers={tableHeaders}
    tableData={records}
    onSort={onSort}
    sortOrder={sortOrder}
    onFilterRecords={onFilterRecords}
    values={values}
    className={className}
    valuesFromSearch={valuesFromSearch}
  />
);

export default RecordTable;
