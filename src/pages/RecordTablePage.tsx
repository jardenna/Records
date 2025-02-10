import { FC, useCallback, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { SortOrder } from '../app/api/apiTypes';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ErrorBoundaryFallback from '../components/errorBoundary/ErrorBoundaryFallback';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import MetaTags from '../components/MetaTags';
import {
  PrimaryActionBtnProps,
  SecondaryActionBtnProps,
} from '../components/modal/Modal';
import Pagination from '../components/pagination/Pagination';
import RecordTable from '../components/recordTable/RecordTable';
import SelectBox, { Option } from '../components/SelectBox';
import SkeletonList from '../components/skeleton/SkeletonList';
import useLanguage from '../features/language/useLanguage';
import { selectModalId, toggleModal } from '../features/modalSlice';
import {
  useDeleteRecordMutation,
  useGetPaginatedRecordsQuery,
} from '../features/records/recordsApiSlice';
import useFormValidation from '../hooks/useFormValidation';
import { MainPath } from '../layout/nav/enums';
import { LabelKeys } from '../types/enums';
import { ChangeInputType } from '../types/types';

const RecordTablePage: FC = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const defaultOptionValue = 10;
  const pageLimit = 5;
  const tableHeaders = [
    LabelKeys.Artist,
    LabelKeys.Title,
    LabelKeys.ProdYear,
    LabelKeys.Label,
    LabelKeys.Origin,
  ];
  const [sortingField, setSortingField] = useState('createdAt');
  const [sortingOrder, setSortingOrder] = useState(SortOrder.Desc);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [deleteRecord] = useDeleteRecordMutation();

  const {
    artist,
    label,
    prodYear,
    title,
    limit,
    sortOrder,
    sortField,
    page,
    origin,
  } = Object.fromEntries(searchParams);

  const initialState = {
    limit: limit || defaultOptionValue.toString(),
    artist: '',
    title: '',
    label: '',
    prodYear: '',
    origin: '',
  };

  const { onCustomChange, values, onChange, onClearAll } = useFormValidation({
    initialState,
  });

  const shownRows = Number(limit) || Number(values.limit);
  const selectedPage = Number(page) || currentPage;
  const {
    data: records,
    isLoading,
    refetch,
  } = useGetPaginatedRecordsQuery({
    page: selectedPage,
    limit: shownRows,
    sortField: sortField || sortingField,
    sortOrder: (sortOrder as SortOrder) || sortingOrder,
    artist: artist || values.artist,
    title: title || values.title,
    label: label || values.label,
    prodYear: prodYear || values.prodYear,
    origin: origin || values.origin,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const totalCount = records ? records.recordsCount : shownRows;
  const totalRows = records?.recordsCount || 0;
  const startRow = (selectedPage - 1) * shownRows + 1;
  const endRow = Math.min(selectedPage * shownRows, totalRows);
  const modalId = useAppSelector(selectModalId);
  const { addMessagePopup } = useMessagePopup();

  const handleSort = (field: string) => {
    searchParams.set('sortField', field);
    searchParams.set('sortOrder', sortingOrder);
    setSearchParams(searchParams);
    if (sortingField === field) {
      setSortingOrder(
        sortingOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc,
      );
    } else {
      setSortingField(field);
      setSortingOrder(SortOrder.Asc);
    }
  };

  const handleOpenModal = useCallback(
    (id: string) => {
      dispatch(toggleModal(id));
    },
    [dispatch],
  );

  const handleFilterRecords = (event: ChangeInputType) => {
    const { name, value } = event.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }

    setSearchParams(searchParams);
    onChange(event);
  };

  const handleClearAllSearch = () => {
    onClearAll();
    setSearchParams();
  };

  const handleDeleteAlbum = async () => {
    try {
      const result = await deleteRecord(modalId).unwrap();

      if (result) {
        addMessagePopup({
          message: language.albumDeletedSuccessfully,
          messagePopupType: 'success',
        });
        if (result.success === false) {
          addMessagePopup({
            message: result.message,
            messagePopupType: 'error',
            componentType: 'notification',
            position: 'top-center',
          });
        }
      }
    } catch (error: any) {
      addMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
        position: 'top-center',
      });
    }

    dispatch(toggleModal(null));
  };

  const primaryActionBtn: PrimaryActionBtnProps = {
    label: language.delete,
    onClick: handleDeleteAlbum,
  };

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  const handleSetRowsCount = (name: string, selectedOptions: Option) => {
    if (selectedOptions.value !== defaultOptionValue) {
      searchParams.set('limit', selectedOptions.value.toString());
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
    onCustomChange(name, selectedOptions.value);
  };

  const handleViewAlbum = (id: string) => {
    dispatch(toggleModal(null));
    navigate(`/${MainPath.Details}/${id}${location.search}`);
  };

  return (
    <section>
      <MetaTags
        description="This is the records page description"
        keywords="records, music, artists"
        title={language.albumsTable}
      />

      <div className="record-select-container">
        <p>
          {language.showing} {startRow} {language.to} {endRow} {language.of}{' '}
          {totalRows} {language.albumsSmall}
        </p>
        <form onSubmit={(event) => event.preventDefault()}>
          <SelectBox
            name="limit"
            options={[
              {
                value: defaultOptionValue,
                label: defaultOptionValue.toString(),
              },
              { value: 20, label: '20' },
              { value: 50, label: '50' },
              { value: totalCount, label: language.all },
            ]}
            id="limit"
            onChange={(selectedOptions) =>
              handleSetRowsCount('limit', selectedOptions as Option)
            }
            labelText={language.resultsPerPage}
            inputHasNoLabel
            defaultValue={{
              value: Number(limit) || 10,
              label: limit || defaultOptionValue.toString(),
            }}
          />
        </form>
      </div>

      {!isLoading ? (
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={() => refetch}
        >
          {records && (
            <RecordTable
              isLoading={isLoading}
              tableData={records.results}
              onSort={handleSort}
              sortOrder={sortOrder}
              onFilterRows={handleFilterRecords}
              values={values}
              valuesFromSearch={Object.fromEntries(searchParams)}
              tableHeaders={tableHeaders}
              onClearAllSearch={handleClearAllSearch}
              tableCaption={language.albumCollection}
              primaryActionBtn={primaryActionBtn}
              secondaryActionBtn={secondaryActionBtn}
              id={modalId}
              onOpenModal={handleOpenModal}
              onViewAlbum={handleViewAlbum}
            />
          )}
        </ErrorBoundary>
      ) : (
        <SkeletonList count={8} className="column" variant="secondary" />
      )}

      <Pagination
        currentPage={selectedPage}
        totalCount={totalCount}
        setCurrentPage={setCurrentPage}
        selectedPage={selectedPage}
        pageLimit={pageLimit}
        rowsPerPage={shownRows}
      />
    </section>
  );
};

export default RecordTablePage;
