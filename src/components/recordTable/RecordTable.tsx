import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { ChangeInputType } from '../../types/types';
import VisuallyHidden from '../VisuallyHidden';
import './_table.scss';
import ActionBody from './ActionBody';
import RecordTableHeader from './RecordTableHeader';
import ActionHeader from './TableActionHeader';

interface BaseTableProps {
  id: string | null;
  onClearAllSearch: () => void;
  onFilterRows: (e: ChangeInputType) => void;
  onOpenModal: (id: string) => void;
  onViewAlbum: (id: string) => void;
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
  isLoading,
  id,
  onViewAlbum,
  onOpenModal,
}: RecordTableProps<T>) => {
  const { language } = useLanguage();

  return (
    <div className={`table-container ${className}`}>
      <table aria-label={isLoading ? language.loading : undefined}>
        <VisuallyHidden as="caption">{tableCaption}</VisuallyHidden>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <RecordTableHeader
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
        {tableData.length > 0 ? (
          <tbody>
            {tableData.map((data, rowIndex) => (
              <tr key={rowIndex}>
                {tableHeaders.map((header) => (
                  <td key={header}>{data[header]}</td>
                ))}
                <ActionBody
                  onViewAlbum={() => onViewAlbum(data.id)}
                  modalId={id === data.id ? data.id : null}
                  id={id}
                  name={data.artist}
                  to={`/${MainPath.Update}/${data.id}`}
                  onOpenModal={() => onOpenModal(data.id)}
                />
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
