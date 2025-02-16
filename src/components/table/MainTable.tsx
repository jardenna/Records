import { FC, useState } from 'react';
import { Records } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { ChangeInputType } from '../../types/types';
import { IconName } from '../icons/Icon';
import ActionBody from '../recordTable/ActionBody';
import RecordTableHeader from '../recordTable/RecordTableHeader';
import ActionHeader from '../recordTable/TableActionHeader';
import TableGridIcons from '../recordTable/TableGridIcons';
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

  const [padding, setPadding] = useState(12);

  const handlePadding = (variant: number) => {
    setPadding(variant);
  };

  const style = {
    paddingTop: padding,
    paddingBottom: padding,
  };
  const tableGridIconList = [
    { padding: 4, iconName: IconName.GridSmall, title: 'smallGrid' },
    { padding: 12, iconName: IconName.Grid, title: 'grid' },
    { padding: 20, iconName: IconName.GridLarge, title: 'largeGrid' },
  ];

  return (
    <>
      <TableGridIcons
        onPadding={handlePadding}
        tableGridIconList={tableGridIconList}
        isActive={padding}
      />

      <div className="fixed-table">
        <table
          className="main-table"
          aria-label={isLoading ? language.loading : undefined}
        >
          <VisuallyHidden as="caption">{tableCaption}</VisuallyHidden>

          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th scope="col" style={style} key={header}>
                  <RecordTableHeader
                    onSort={onSort}
                    showIcon={valuesFromSearch.sortField === header}
                    sortOrder={sortOrder}
                    title={header}
                    onFilterRows={onFilterRows}
                    value={
                      (valuesFromSearch[header] as string) || values[header]
                    }
                  />
                </th>
              ))}
              <ActionHeader onClearAllSearch={onClearAllSearch} />
            </tr>
          </thead>
          <tbody>
            {tableData.map((album) => (
              <tr key={album.id}>
                <td style={style}>{album.artist}</td>
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
    </>
  );
};

export default MainTable;
