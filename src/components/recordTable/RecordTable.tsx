import { FC } from 'react';
import { Record } from '../../app/api/apiTypes';

interface RecordTableProps {
  records: Record[];
}

const RecordTable: FC<RecordTableProps> = ({ records }) => {
  const labels = {
    artist: 'Gruppe / Kunstner',
    title: 'Titel',
    prodYear: 'Produktions år',
    label: 'Plademærke',
    origin: 'Oprindelse',
    price: 'Pris',
    recordNo: 'Pladenummer',
    numOfRecords: 'Antal lp(er)',
    released: 'Senest udgivet',
    info: 'Værd at vide',
  };

  console.log(records);
  const x = Object.values(labels);

  return (
    <table className="table">
      <thead>
        <tr>
          {x.map((header) => (
            <th scope="col" key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {/* {records.map((record) => (
            <td>{record.artist}</td>
          ))} */}
        </tr>
      </tbody>
    </table>
  );
};

export default RecordTable;
