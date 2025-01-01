import { useState } from 'react';
import { Link } from 'react-router';
import { MainPath } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import './_table.scss';
import SearchField from './SearchField';
import SortBtn from './SortBtn';

interface TableProps<T> {
  caption: string;
  headers: string[];
  onFilterRecords: (e: ChangeInputType) => void;
  onSort: (field: keyof T) => void;
  searchParams: string;
  sortOrder: string;
  tableData: T[];
  values: Record<string, string>;
  valuesFromSearch: any;
  className?: string;
}

const Table = <T extends Record<string, any>>({
  caption,
  headers,
  tableData,
  onSort,
  searchParams,
  sortOrder,
  className,
  onFilterRecords,
  valuesFromSearch,
  values,
}: TableProps<T>) => {
  const [showSearchField, setShowSearchField] = useState('');

  const handleToggleSearchField = (header: string) => {
    setShowSearchField((prev) => (prev === header ? '' : header));
  };

  return (
    <div className={`table-container ${className}`}>
      <table>
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            {headers.map((header) => (
              <th scope="col" key={header}>
                <div className="table-header-container">
                  <SortBtn
                    onSort={() => onSort(header)}
                    showIcon={valuesFromSearch.sortField === header}
                    sortOrder={sortOrder}
                    title={header}
                  />

                  {values[header] !== undefined && (
                    <SearchField
                      onFilterRecords={onFilterRecords}
                      title={header}
                      value={valuesFromSearch[header] || values[header]}
                      onToggleSearchField={handleToggleSearchField}
                      showSearchField={showSearchField}
                    />
                  )}
                </div>
              </th>
            ))}
            <th className="detail-table-header">Details</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header) => (
                <td key={header}>{data[header]}</td>
              ))}
              <td className="detail-table-header">
                <Link
                  className="btn btn-primary"
                  to={`/${MainPath.Details}/${data.id}${searchParams}`}
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
