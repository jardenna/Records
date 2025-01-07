import { FC } from 'react';
import { Records } from '../../app/api/apiTypes';
import { ChangeInputType } from '../../types/types';
import Table from './Table';

export interface BaseTableProps {
  onFilterRows: (e: ChangeInputType) => void; // Optionally override
  sortOrder: string;
  tableCaption: string;
  tableHeaders: string[];
  tableSearchParams: string;
  values: Record<string, string>;
  valuesFromSearch: any;
  className?: string;
  onClearAllSearch?: () => void;
}

interface RecordTableProps extends BaseTableProps {
  onSort: (field: string) => void;
  records: Records[];
}

const RecordTable: FC<RecordTableProps> = ({
  records,
  onSort,
  tableSearchParams,
  sortOrder,
  onFilterRows,
  values,
  valuesFromSearch,
  className,
  tableHeaders,
  onClearAllSearch,
  tableCaption,
}) => (
  <Table
    tableSearchParams={tableSearchParams}
    tableHeaders={tableHeaders}
    tableData={records}
    onSort={onSort}
    sortOrder={sortOrder}
    onFilterRows={onFilterRows}
    values={values}
    className={className}
    valuesFromSearch={valuesFromSearch}
    onClearAllSearch={onClearAllSearch}
    tableCaption={tableCaption}
  />
);

export default RecordTable;
