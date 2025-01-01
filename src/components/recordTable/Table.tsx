import { Link } from 'react-router';
import { BtnVariant, MainPath } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import Button from '../Button';
import Input from '../formElements/Input';
import Icon, { IconName } from '../icons/Icon';
import './_table.scss';

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
}: TableProps<T>) => (
  <div className={`table-container ${className}`}>
    <table>
      <caption className="visually-hidden">{caption}</caption>
      <thead>
        <tr>
          {headers.map((header) => (
            <th scope="col" key={header}>
              <div>
                <Button
                  variant={BtnVariant.Ghost}
                  onClick={() => onSort(header)}
                >
                  {header}
                  {valuesFromSearch.sortField === header && (
                    <Icon
                      size="16"
                      name={
                        sortOrder === 'desc'
                          ? IconName.ArrowDown
                          : IconName.ArrowUp
                      }
                      title={`Sort by ${header}`}
                    />
                  )}
                </Button>

                {values[header] !== undefined && (
                  <div>
                    <Icon name={IconName.Filter} title={`Filter ${header}`} />
                    <Input
                      type="search"
                      name={header}
                      id={header}
                      placeholder={`Filter by ${header}`}
                      value={valuesFromSearch[header] || values[header]}
                      onChange={onFilterRecords}
                      labelText={`Filter by ${header}`}
                    />
                  </div>
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
export default Table;
