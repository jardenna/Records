import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useAppDispatch } from '../../app/hooks';
import { toggleModal } from '../../features/modalSlice';
import useClickOutside from '../../hooks/useClickOutside';
import { BtnVariant, MainPath } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import Button from '../Button';
import DeleteRecordModal from '../DeleteRecordModal';
import Icon, { IconName } from '../icons/Icon';
import { PrimaryActionBtnProps } from '../modal/Modal';
import VisuallyHidden from '../VisuallyHidden';
import './_table.scss';
import SearchField from './SearchField';
import SortBtn from './SortBtn';

interface TableProps<T> {
  onFilterRows: (e: ChangeInputType) => void;
  onSort: (field: keyof T) => void;
  sortOrder: string;
  tableCaption: string;
  tableData: T[];
  tableHeaders: string[];
  tableSearchParams: string;
  values: Record<string, string>;
  valuesFromSearch: any;
  className?: string;
  onClearAllSearch?: () => void;
}

const Table = <T extends Record<string, any>>({
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
}: TableProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSearchField, setShowSearchField] = useState<string | null>(null);
  const containerRefs = useRef<any>(new Map());
  useClickOutside(containerRefs, () => setShowSearchField(null));
  const dispatch = useAppDispatch();

  const handleToggleSearchField = (header: string) => {
    setShowSearchField((prev) => (prev === header ? null : header));
  };
  const handleSetSearchParams = (id: string) => {
    setSearchParams({ id });
  };

  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      dispatch(toggleModal(id));
    }
  }, [id]);

  const handleDeleteSearchParams = () => {
    if (id) {
      searchParams.delete('id');
      //  setSearchParams(searchParams);
    }
  };

  const primaryActionBtn: PrimaryActionBtnProps = {
    label: 'delete',
    onClick: handleDeleteSearchParams,
  };

  return (
    <div className={`table-container ${className}`}>
      <table>
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
                    onSort={() => onSort(header)}
                    showIcon={valuesFromSearch.sortField === header}
                    sortOrder={sortOrder}
                    title={header}
                  />

                  {values[header] !== undefined && (
                    <SearchField
                      onFilterRows={onFilterRows}
                      title={header}
                      value={valuesFromSearch[header] || values[header]}
                      onToggleSearchField={handleToggleSearchField}
                      showSearchField={showSearchField === header}
                    />
                  )}
                </div>
              </th>
            ))}
            <th className="detail-table-header">
              Details
              <Button onClick={onClearAllSearch} variant={BtnVariant.Ghost}>
                <Icon title="" name={IconName.Undo} />
              </Button>
            </th>
          </tr>
        </thead>
        {tableData.length > 0 ? (
          <tbody>
            {tableData.map((data, rowIndex) => (
              <tr key={rowIndex}>
                {tableHeaders.map((header) => (
                  <td key={header}>{data[header]}</td>
                ))}
                <td className="detail-table-header">
                  <Link
                    className="btn btn-primary"
                    to={`/${MainPath.Details}/${data.id}${tableSearchParams}`}
                  >
                    Details
                  </Link>
                  <Button onClick={() => handleSetSearchParams(data.id)}>
                    Delete
                  </Button>
                  {id && id === data.id && (
                    <DeleteRecordModal
                      modalId={id}
                      primaryActionBtn={primaryActionBtn}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td className="no-records-table-field">No records found</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
