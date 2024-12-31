import { Link } from 'react-router';
import { SortOrder } from '../../app/api/apiTypes';
import { BtnVariant, MainPath } from '../../types/enums';
import Button from '../Button';
import Icon, { IconName } from '../icons/Icon';
import './_table.scss';

// Define an interface with id
interface Identifiable {
  id: string;
}

// Extend T to ensure it includes `id`
interface TableProps<T extends Identifiable> {
  caption: string;
  headers: string[];
  onSort: any;
  searchParams: string;
  sortField: string;
  sortOrder: string;
  tableData: T[];
  className?: string;
}

const Table = <T extends Identifiable>({
  caption,
  headers,
  tableData,
  onSort,
  searchParams,
  sortField,
  sortOrder,
  className,
}: TableProps<T>) => {
  const handleTest = (header: string) => {
    onSort(header);
  };

  return (
    <div className={`table-container ${className}`}>
      <table>
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            {headers.map((header) => (
              <th scope="col" key={header}>
                <Button
                  variant={BtnVariant.Ghost}
                  onClick={() => handleTest(header)}
                >
                  {header}
                  {sortField === header && (
                    <Icon
                      size="16"
                      name={
                        sortOrder === SortOrder.Desc
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
          {tableData.map((data: any, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header) => (
                <td key={header}>{data[header]}</td>
              ))}
              <td className="detail-td">
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
