import { useRef, useState } from 'react';
import { Link } from 'react-router';
import useClickOutside from '../../hooks/useClickOutside';
import { BtnVariant, MainPath } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import Button from '../Button';
import Icon, { IconName } from '../icons/Icon';
import VisuallyHidden from '../VisuallyHidden';
import './_table.scss';
import SearchField from './SearchField';
import SortBtn from './SortBtn';

interface TableProps<T> {
  caption: string;
  headers: string[];
  onFilterRows: (e: ChangeInputType) => void;
  onSort: (field: keyof T) => void;
  searchParams: string;
  sortOrder: string;
  tableData: T[];
  values: Record<string, string>;
  valuesFromSearch: any;
  className?: string;
  onClearAllSearch?: () => void;
}

const Table = <T extends Record<string, any>>({
  caption,
  headers,
  tableData,
  onSort,
  searchParams,
  sortOrder,
  className = '',
  onFilterRows,
  valuesFromSearch,
  values,
  onClearAllSearch,
}: TableProps<T>) => {
  const [showSearchField, setShowSearchField] = useState<string | null>(null);
  const containerRefs = useRef<any>(new Map());

  const handleToggleSearchField = (header: string) => {
    setShowSearchField((prev) => (prev === header ? null : header));
  };

  useClickOutside(containerRefs, () => setShowSearchField(null));

  return (
    <div className={`table-container ${className}`}>
      <table>
        <VisuallyHidden as="caption">{caption}</VisuallyHidden>
        <thead>
          <tr>
            {headers.map((header) => (
              <th scope="col" key={header}>
                <div
                  className="table-header-container"
                  ref={(el) => {
                    if (el) {
                      containerRefs.current.set(header, el);
                    } else {
                      containerRefs.current.delete(header);
                    }
                  }}
                >
                  <SortBtn
                    onSort={() => onSort(header)}
                    showIcon={valuesFromSearch.sortField === header}
                    sortOrder={sortOrder}
                    title={header}
                  />

                  {values[header] !== undefined && (
                    <SearchField
                      onFilterRows={onFilterRows}
                      title={header}
                      value={valuesFromSearch[header] || values[header]}
                      onToggleSearchField={handleToggleSearchField}
                      showSearchField={showSearchField === header}
                    />
                  )}
                </div>
              </th>
            ))}
            <th className="detail-table-header">
              Details
              <Button onClick={onClearAllSearch} variant={BtnVariant.Ghost}>
                <Icon title="" name={IconName.Undo} />
              </Button>
            </th>
          </tr>
        </thead>
        {tableData.length > 0 ? (
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
        ) : (
          <tbody>
            <tr>
              <td className="no-records-table-field">No records found</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
