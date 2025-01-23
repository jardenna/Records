import { useRef, useState } from 'react';
import useLanguage from '../../features/language/useLanguage';
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
  id: string | null;
  onClearAllSearch: () => void;
  onFilterRows: (e: ChangeInputType) => void;
  onOpenModal: (id: string) => void;
  onViewAlbum: (id: string) => void;
  primaryActionBtn: PrimaryActionBtnProps;
  secondaryActionBtn: SecondaryActionBtnProps;
  sortOrder: string;
  tableCaption: string;
  tableHeaders: string[];
  values: Record<string, string>;
  valuesFromSearch: Record<string, string | number | boolean>;
  className?: string;
  isLoading?: boolean;
}
interface RecordTableProps<T> extends BaseTableProps {
  onSort: (id: string) => void;
  tableData: T[];
}
const RecordTable = <T extends Record<string, any>>({
  tableHeaders,
  tableData,
  onSort,
  sortOrder,
  className = '',
  onFilterRows,
  valuesFromSearch,
  values,
  onClearAllSearch,
  tableCaption,
  primaryActionBtn,
  secondaryActionBtn,
  isLoading,
  id,
  onViewAlbum,
  onOpenModal,
}: RecordTableProps<T>) => {
  const { language } = useLanguage();
  const [showSearchField, setShowSearchField] = useState<string | null>(null);
  const containerRefs = useRef<Map<HTMLElement, HTMLElement>>(new Map());
  useClickOutside(containerRefs, () => setShowSearchField(null));

  const handleToggleSearchField = (header: string) => {
    setShowSearchField((prev) => (prev === header ? null : header));
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
                  ref={(header: HTMLElement | null) => {
                    if (header) {
                      containerRefs.current.set(header, header);
                    } else {
                      containerRefs.current.delete(header!);
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
                      onClick={() => onViewAlbum(data.id)}
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
                      onClick={() => onOpenModal(data.id)}
                    />
                    <DeleteRecordModal
                      modalId={id === data.id ? data.id : null}
                      primaryActionBtn={primaryActionBtn}
                      secondaryActionBtn={secondaryActionBtn}
                      name={data.artist}
                    />
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
