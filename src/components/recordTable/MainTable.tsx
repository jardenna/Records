import { FC, memo, useCallback, useState } from 'react';
import { Records } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import useLocalStorage from '../../hooks/useLocalStorage';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import DeleteRecordModal from '../DeleteRecordModal';
import IconBtn from '../IconBtn';
import Icon, { IconName } from '../icons/Icon';
import RecordSelect from '../recordSelect/RecordSelect';
import { Option, SelectedOption } from '../selectBox/SelectBox';
import DetailLink from '../shared/DetailLink';
import SkeletonList from '../skeleton/SkeletonList';
import Table from '../table/Table';
import RecordTableHeader from './RecordTableHeader';
import TableActionHeader from './TableActionHeader';
import TableGridIcons from './TableGridIcons';

interface ModalInfoProps {
  artistName: string;
  id: string | null;
}
export interface BaseMainTableProps {
  defaultValue: Option;
  endRow: number;
  onSelectCount: (value: SelectedOption) => void;
  options: { label: string; value: string | number }[];
  startRow: number;
  totalRows: number;
}

interface MainTableProps extends BaseMainTableProps {
  id: string | null;
  isLoading: boolean;
  isPending: boolean;
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
  onSelectCount,
  defaultValue,
  isPending,
}) => {
  const { language } = useLanguage();
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

  const memoizedOnViewAlbum = useCallback(
    (id: string) => onViewAlbum(id),
    [onViewAlbum],
  );

  const [modalInfo, setModalInfo] = useState<ModalInfoProps>({
    id: null,
    artistName: '',
  });
  const memoizedOnOpenModal = useCallback(
    (id: string, artistName: string) => {
      setModalInfo({ id, artistName });
      onOpenModal(id);
    },
    [onOpenModal],
  );

  return (
    <>
      <div className="table-actions">
        <RecordSelect
          defaultValue={defaultValue}
          endRow={endRow}
          onSelectCount={onSelectCount}
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
            <TableActionHeader onClearAllSearch={onClearAllSearch} />
          </tr>
        </thead>
        {tableData.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={6} className="no-records-table-field">
                <span className="no-record-info"> {language.noAlbumFound}</span>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {!isPending ? (
              tableData.map((album) => (
                <tr key={album.id}>
                  <td style={style}>{album.artist}</td>
                  <td>{album.title}</td>
                  <td>{album.prodYear}</td>
                  <td>{album.label}</td>
                  <td>{album.origin}</td>
                  <td>
                    <div className="table-action-body">
                      <IconBtn
                        iconName={IconName.Eye}
                        title={language.eye}
                        ariaLabel={language.albumDetails}
                        onClick={() => memoizedOnViewAlbum(album.id)}
                      />
                      <DetailLink
                        btnVariant={BtnVariant.Ghost}
                        to={`/${MainPath.Update}/${album.id}`}
                      >
                        <Icon
                          iconName={IconName.Edit}
                          title={language.pensil}
                        />
                      </DetailLink>

                      <IconBtn
                        iconName={IconName.Trash}
                        className="danger"
                        title={language.trashCan}
                        ariaLabel={language.deleteAlbum}
                        onClick={() =>
                          memoizedOnOpenModal(album.id, album.artist)
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-records-table-field">
                  <SkeletonList
                    count={8}
                    className="column"
                    variant="secondary"
                  />
                </td>
              </tr>
            )}
          </tbody>
        )}
      </Table>

      <DeleteRecordModal
        modalId={modalInfo.id}
        id={id}
        btnLabel={language.delete}
        name={modalInfo.artistName}
      />
    </>
  );
};

export default memo(MainTable);
