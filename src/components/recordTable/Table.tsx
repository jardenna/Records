/* eslint-disable no-param-reassign */
import { Link } from 'react-router';
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
  headers: Record<keyof T, string>;
  onSort: any;
  searchParams: string;
  tableData: T[];
  className?: string;
  excludeKeys?: (keyof T)[];
}

const Table = <T extends Identifiable>({
  caption,
  headers,
  tableData,
  className = '',
  excludeKeys = [],
  onSort,
  searchParams,
}: TableProps<T>) => {
  // Filter headers to exclude specified keys
  const filteredHeaders = Object.entries(headers)
    .filter(([key]) => !excludeKeys.includes(key as keyof T))
    .reduce(
      (acc, [key, value]) => {
        acc[key as keyof T] = value as string;
        return acc;
      },
      {} as Record<keyof T, string>,
    );

  // Extract header names and header keys after filtering
  const headerList: string[] = Object.keys(filteredHeaders);
  const headerListIds = Object.keys(filteredHeaders) as (keyof T)[];

  return (
    <table className={className}>
      <caption className="visually-hidden">{caption}</caption>
      <thead>
        <tr>
          {headerList.map((header) => (
            <th scope="col" key={header}>
              {header}
              <Button variant={BtnVariant.Ghost} onClick={() => onSort(header)}>
                <Icon name={IconName.ArrowDown} title="Sort by" />
              </Button>
            </th>
          ))}
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((data, rowIndex) => (
          <tr key={rowIndex}>
            {headerListIds.map((header) => (
              <td key={String(header)}>{String(data[header])}</td>
            ))}
            <td>
              <Link
                className="btn btn-primary details-btn"
                to={`/${MainPath.Details}/${data.id}${searchParams}`}
              >
                Details
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
