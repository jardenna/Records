import { Link } from 'react-router';
import { BtnVariant, MainPath } from '../../types/enums';
import Button from '../Button';
import Icon, { IconName } from '../icons/Icon';
import './_table.scss';

interface TableProps<T> {
  caption: string;
  headers: string[];
  onSort: (field: keyof T) => void;
  searchParams: string;
  sortField: string;
  sortOrder: string;
  tableData: T[];
  className?: string;
}

const Table = <T extends Record<string, any>>({
  caption,
  headers,
  tableData,
  onSort,
  searchParams,
  sortField,
  sortOrder,
  className,
}: TableProps<T>) => (
  <div className={`table-container ${className}`}>
    <table>
      <caption className="visually-hidden">{caption}</caption>
      <thead>
        <tr>
          {headers.map((header) => (
            <th scope="col" key={header}>
              <Button variant={BtnVariant.Ghost} onClick={() => onSort(header)}>
                {header}
                {sortField === header && (
                  <Icon
                    size="16"
                    name={
                      sortOrder === 'desc'
                        ? IconName.ArrowDown
                        : IconName.ArrowUp
                    }
                    title="Sort by"
                  />
                )}
              </Button>
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
