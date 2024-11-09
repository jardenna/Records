/* eslint-disable no-param-reassign */
import './_table.scss';

interface TableProps<T> {
  data: T[];
  headers: Record<keyof T, string>;
  excludeKeys?: (keyof T)[]; // Define excludeKeys as an array of keys of T
}

const Table = <T,>({ headers, data, excludeKeys = [] }: TableProps<T>) => {
  // Filter headers to exclude specified keys
  const filteredHeaders = Object.entries(headers)
    .filter(([key]) => !excludeKeys.includes(key as keyof T))
    .reduce(
      (acc, [key, value]) => {
        acc[key as keyof T] = value as string; // Ensure value is treated as a string
        return acc;
      },
      {} as Record<keyof T, string>,
    );

  // Extract header names and header keys after filtering
  const headerList: string[] = Object.values(filteredHeaders);
  const headerListIds = Object.keys(filteredHeaders) as (keyof T)[];

  return (
    <table className="record-table">
      <thead>
        <tr>
          {headerList.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((datum, rowIndex) => (
          <tr key={rowIndex}>
            {headerListIds.map((header) => (
              <td key={String(header)}>
                <span>{String(datum[header])}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
