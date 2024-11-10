/* eslint-disable no-param-reassign */
import DetailLink from '../recordDetails/DetailLink';

import './_table.scss';

// Define an interface with id
interface Identifiable {
  id: string;
}

// Extend T to ensure it includes `id`
interface TableProps<T extends Identifiable> {
  caption: string;
  headers: Record<keyof T, string>;
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
  const headerList: string[] = Object.values(filteredHeaders);
  const headerListIds = Object.keys(filteredHeaders) as (keyof T)[];

  return (
    <table className={className}>
      <caption className="visually-hidden">{caption}</caption>
      <thead>
        <tr>
          {headerList.map((header) => (
            <th scope="col" key={header}>
              {header}
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
              <DetailLink id={data.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
