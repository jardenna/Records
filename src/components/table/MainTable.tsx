import { FC } from 'react';
import { Records } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import './_table.scss';

interface MainTableProps {
  tableData: Records[];
  tableHeaders: string[];
}

const MainTable: FC<MainTableProps> = ({ tableHeaders, tableData }) => {
  const { language } = useLanguage();

  return (
    <div className="tbl-container">
      <div className="row tbl-fixed">
        <table className="main-table">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header} scope="col">
                  {language[header]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((album) => (
              <tr>
                <td>{album.artist}</td>
                <td>{album.title}</td>
                <td>{album.prodYear}</td>
                <td>{album.label}</td>
                <td>{album.origin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainTable;
