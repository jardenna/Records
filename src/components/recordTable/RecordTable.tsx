import { FC } from 'react';
import { Records } from '../../app/api/apiTypes';
import { ChangeInputType } from '../../types/types';
import Table from './Table';

export interface BaseTableProps {
  sortOrder: string;
  tableCaption: string;
  tableHeaders: string[];
  values: Record<string, string>;
  valuesFromSearch: any;
  className?: string;
  onClearAllSearch?: () => void;
}

interface RecordTableProps extends BaseTableProps {
  onFilterRecords: (e: ChangeInputType) => void; // Optionally override
  onSort: (field: string) => void; // Specific to RecordTableProps
  records: Records[]; // Specific to RecordTableProps
  searchParams: string;
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
    tableSearchParams={searchParams}
    tableHeaders={tableHeaders}
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
