import { FC } from 'react';
import { Records } from '../../app/api/apiTypes';
import useLocalStorage from '../../hooks/useLocalStorage';
import { MainPath } from '../../layout/nav/enums';
import { ChangeInputType } from '../../types/types';
import { IconName } from '../icons/Icon';
import RecordSelect from '../recordSelect/RecordSelect';
import { SelectedOption } from '../selectBox/SelectBox';
import Table from '../table/Table';
import RecordTableHeader from './RecordTableHeader';
import ActionBody from './TableActionBody';
import ActionHeader from './TableActionHeader';
import TableGridIcons from './TableGridIcons';

export interface BaseMainTableProps {
  defaultValue: any;
  endRow: number;
  onChange: (value: SelectedOption) => void;
  options: { label: string; value: string | number }[];
  startRow: number;
  totalRows: number;
}

interface MainTableProps extends BaseMainTableProps {
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
  startRow,
  endRow,
  totalRows,
  options,
  onChange,
  defaultValue,
}) => {
  const [padding, setPadding] = useLocalStorage('padding', 12);

  const handlePadding = (paddingStyle: number) => {
    setPadding(paddingStyle);
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
      <div className="table-actions">
        <RecordSelect
          defaultValue={defaultValue}
          endRow={endRow}
          onChange={onChange}
          options={options}
          startRow={startRow}
          totalRows={totalRows}
        />
        <TableGridIcons
          onSetPadding={handlePadding}
          tableGridIconList={tableGridIconList}
          isActive={padding}
        />
      </div>

      <Table isLoading={isLoading} tableCaption={tableCaption}>
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
                  value={(valuesFromSearch[header] as string) || values[header]}
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
      </Table>
    </>
  );
};

export default MainTable;
