import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useLanguage from '../../features/language/useLanguage';
import { selectModalId, toggleModal } from '../../features/modalSlice';
import useClickOutside from '../../hooks/useClickOutside';
import { BtnVariant, MainPath } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import DeleteRecordModal from '../DeleteRecordModal';
import IconBtn from '../IconBtn';
import IconContent from '../IconContent';
import { IconName } from '../icons/Icon';
import { PrimaryActionBtnProps, SecondaryActionBtnProps } from '../modal/Modal';
import DetailLink from '../shared/DetailLink';
import VisuallyHidden from '../VisuallyHidden';
import './_table.scss';
import SearchField from './SearchField';
import SortBtn from './SortBtn';

interface BaseTableProps {
  idFromSearchParams: string | null;
  onClearAllSearch: () => void;
  onFilterRows: (e: ChangeInputType) => void;
  primaryActionBtn: PrimaryActionBtnProps;
  secondaryActionBtn: SecondaryActionBtnProps;
  sortOrder: string;
  tableCaption: string;
  tableHeaders: string[];
  tableSearchParams: string;
  values: Record<string, string>;
  valuesFromSearch: Record<string, string | number | boolean>;
  className?: string;
  isLoading?: boolean;
}
interface RecordTableProps<T> extends BaseTableProps {
  onSort: any;
  tableData: T[] | null;
}
const RecordTable = <T extends Record<string, any>>({
  tableHeaders,
  tableData,
  onSort,
  tableSearchParams,
  sortOrder,
  className = '',
  onFilterRows,
  valuesFromSearch,
  values,
  onClearAllSearch,
  tableCaption,
  primaryActionBtn,
  secondaryActionBtn,
  idFromSearchParams,
  isLoading,
}: RecordTableProps<T>) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const modalId = useAppSelector(selectModalId);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSearchField, setShowSearchField] = useState<string | null>(null);
  const containerRefs = useRef<any>(new Map());
  useClickOutside(containerRefs, () => setShowSearchField(null));
  const dispatch = useAppDispatch();

  const handleToggleSearchField = (header: string) => {
    setShowSearchField((prev) => (prev === header ? null : header));
  };

  const handleSetSearchParams = useCallback(
    (id: string) => {
      setSearchParams({ id });
      dispatch(toggleModal(id));
    },
    [dispatch, setSearchParams],
  );

  useEffect(() => {
    if (!modalId) {
      searchParams.delete('id');
      setSearchParams(searchParams);
    }
  }, [modalId, idFromSearchParams]);

  const handleEditAlbum = (id: string) => {
    searchParams.delete('id');
    setSearchParams(searchParams);
    dispatch(toggleModal(null));
    navigate(`/${MainPath.Details}/${id}${tableSearchParams}`);
  };

  return (
    <div className={`table-container ${className}`}>
      <table aria-label={isLoading ? 'Loading' : undefined}>
        <VisuallyHidden as="caption">{tableCaption}</VisuallyHidden>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th scope="col" key={header}>
                <div
                  className="table-header-container"
                  ref={(el) => {
                    if (el) {
                      containerRefs.current.set(header, el);
                    } else {
                      containerRefs.current.delete(header);
                    }
                  }}
                >
                  <SortBtn
                    onSort={onSort}
                    showIcon={valuesFromSearch.sortField === header}
                    sortOrder={sortOrder}
                    title={header}
                  />

                  {values[header] !== undefined && (
                    <SearchField
                      onFilterRows={onFilterRows}
                      title={header}
                      value={
                        (valuesFromSearch[header] as string) || values[header]
                      }
                      onToggleSearchField={() =>
                        handleToggleSearchField(header)
                      }
                      showSearchField={showSearchField === header}
                    />
                  )}
                </div>
              </th>
            ))}
            <th>
              <div className="action-header">
                Actions
                <IconBtn
                  iconName={IconName.Undo}
                  title={language.clearInputs}
                  onClick={onClearAllSearch}
                />
              </div>
            </th>
          </tr>
        </thead>
        {tableData && tableData.length > 0 ? (
          <tbody>
            {tableData.map((data, rowIndex) => (
              <tr key={rowIndex}>
                {tableHeaders.map((header) => (
                  <td key={header}>{data[header]}</td>
                ))}
                <td>
                  <div className="action-container">
                    <IconBtn
                      iconName={IconName.Eye}
                      title={language.albumDetails}
                      onClick={() => handleEditAlbum(data.id)}
                    />

                    <DetailLink
                      btnVariant={BtnVariant.Ghost}
                      to={`/${MainPath.Update}/${data.id}`}
                    >
                      <IconContent
                        iconName={IconName.Edit}
                        title={language.updateAlbum}
                      />
                    </DetailLink>
                    <IconBtn
                      iconName={IconName.Trash}
                      className="danger"
                      title={language.deleteAlbum}
                      onClick={() => handleSetSearchParams(data.id)}
                    />
                    {idFromSearchParams && idFromSearchParams === data.id && (
                      <DeleteRecordModal
                        modalId={idFromSearchParams}
                        primaryActionBtn={primaryActionBtn}
                        secondaryActionBtn={secondaryActionBtn}
                        name={data.artist}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={6} className="no-records-table-field">
                {language.noAlbumFound}
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default RecordTable;
