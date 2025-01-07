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
  tableCaption: string;
  tableHeaders: string[];
  values: Record<string, string>;
  valuesFromSearch: any;
  className?: string;
  onClearAllSearch?: () => void;
}

const RecordTable: FC<RecordTableProps> = ({
  records,
  onSort,
  searchParams,
  sortOrder,
  onFilterRecords,
  values,
  valuesFromSearch,
  className,
  tableHeaders,
  onClearAllSearch,
  tableCaption,
}) => (
  <Table
    searchParams={searchParams}
    headers={tableHeaders}
    tableData={records}
    onSort={onSort}
    sortOrder={sortOrder}
    onFilterRows={onFilterRecords}
    values={values}
    className={className}
    valuesFromSearch={valuesFromSearch}
    onClearAllSearch={onClearAllSearch}
    tableCaption={tableCaption}
  />
);

export default RecordTable;
