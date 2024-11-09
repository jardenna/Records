import './_table.scss';

// Define a generic type for the Table component
interface TableProps<T> {
  headers: Record<keyof T, string>;
  tableData: T[];
}

const Table = <T,>({ headers, tableData }: TableProps<T>) => {
  const headerList: string[] = Object.values(headers);
  const headerKeysList = Object.keys(headers) as (keyof T)[];

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
        {tableData.map((data, rowIndex) => (
          <tr key={rowIndex}>
            {headerKeysList.map((header) => (
              <td key={String(header)}>{String(data[header])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
