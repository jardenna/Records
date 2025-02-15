import { FC } from 'react';
import { Records } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { ChangeInputType } from '../../types/types';
import ActionBody from '../recordTable/ActionBody';
import ActionHeader from '../recordTable/ActionHeader';
import RecordTableHeader from '../recordTable/RecordTableHeader';
import VisuallyHidden from '../VisuallyHidden';
import './_table.scss';

interface MainTableProps {
  id: string | null;
  isLoading: boolean;
  onClearAllSearch: () => void;
  onFilterRows: (e: ChangeInputType) => void;
  onOpenModal: (id: string) => void;
  onSort: (id: string) => void;
  onViewAlbum: (id: string) => void;
  sortOrder: string;
  tableCaption: string;
  tableData: Records[];
  tableHeaders: string[];
  values: Record<string, string>;
  valuesFromSearch: Record<string, string | number | boolean>;
}

const MainTable: FC<MainTableProps> = ({
  id,
  tableHeaders,
  tableData,
  tableCaption,
  onClearAllSearch,
  onViewAlbum,
  onOpenModal,
  isLoading,
  onFilterRows,
  sortOrder,
  valuesFromSearch,
  values,
  onSort,
}) => {
  const { language } = useLanguage();

  return (
    <div className="tbl-container">
      <div className="row tbl-fixed">
        <table
          className="main-table"
          aria-label={isLoading ? language.loading : undefined}
        >
          <VisuallyHidden as="caption">{tableCaption}</VisuallyHidden>
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <RecordTableHeader
                  key={header}
                  onSort={onSort}
                  showIcon={valuesFromSearch.sortField === header}
                  sortOrder={sortOrder}
                  title={header}
                  onFilterRows={onFilterRows}
                  value={(valuesFromSearch[header] as string) || values[header]}
                />
              ))}
              <ActionHeader onClearAllSearch={onClearAllSearch} />
            </tr>
          </thead>
          <tbody>
            {tableData.map((album) => (
              <tr key={album.id}>
                <td>{album.artist}</td>
                <td>{album.title}</td>
                <td>{album.prodYear}</td>
                <td>{album.label}</td>
                <td>{album.origin}</td>
                <ActionBody
                  onViewAlbum={() => onViewAlbum(album.id)}
                  modalId={id === album.id ? album.id : null}
                  id={id}
                  name={album.artist}
                  to={`/${MainPath.Update}/${album.id}`}
                  onOpenModal={() => onOpenModal(album.id)}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainTable;
