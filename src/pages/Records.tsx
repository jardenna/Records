import { FC, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { SortOrder } from '../app/api/apiTypes';
import SelectBox, { Option } from '../components/formElements/SelectBox';
import MetaTags from '../components/MetaTags';
import Pagination from '../components/pagination/Pagination';
import usePagination from '../components/pagination/usePagination';
import RecordTable from '../components/recordTable/RecordTable';
import useLanguage from '../features/language/useLanguage';
import { useGetPaginatedRecordsQuery } from '../features/records/recordsApiSlice';
import useFormValidation from '../hooks/useFormValidation';
import { ChangeInputType } from '../types/types';

const Records: FC = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const defaultOptionValue = 10;
  const pageLimit = 5;
  const tableHeaders = ['artist', 'title', 'prodYear', 'label', 'origin'];
  const [sortingField, setSortingField] = useState('createdAt');
  const [sortingOrder, setSortingOrder] = useState(SortOrder.Desc);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

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

  const { onCustomChange, values, onChange } = useFormValidation({
    initialState,
  });

  const shownRows = Number(limit) || Number(values.limit);
  const selectedPage = Number(page) || currentPage;
  const { data: records } = useGetPaginatedRecordsQuery({
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

  const totalCount = records ? records.recordsCount : shownRows;
  const {
    pageRange,
    totalPageCount,
    onPaginationItemClick,
    onPaginationAction,
  } = usePagination({
    totalCount,
    rowsPerPage: shownRows,
    pageLimit,
    currentPage: selectedPage,
    setCurrentPage,
    addCurrentPageToParams: true,
  });

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

  const handleSetRowsCount = (name: string, selectedOptions: Option) => {
    if (selectedOptions.value !== defaultOptionValue) {
      searchParams.set('limit', selectedOptions.value.toString());
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
    onCustomChange(name, selectedOptions.value);
  };
  const totalRows = records?.recordsCount || 0;
  const startRow = (selectedPage - 1) * shownRows + 1;
  const endRow = Math.min(selectedPage * shownRows, totalRows);

  return (
    <section>
      <MetaTags
        description="This is the records page description"
        keywords="records, music, artists"
        title="Album table"
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
            labelText="Results per page"
            inputHasNoLabel
            defaultValue={{
              value: Number(limit) || 10,
              label: limit || defaultOptionValue.toString(),
            }}
          />
        </form>
      </div>

      {records && (
        <RecordTable
          records={records.results}
          onSort={handleSort}
          searchParams={location.search}
          sortOrder={sortOrder}
          onFilterRecords={handleFilterRecords}
          values={values}
          valuesFromSearch={Object.fromEntries(searchParams)}
          tableHeaders={tableHeaders}
        />
      )}

      <Pagination
        currentPage={selectedPage}
        onPaginationItemClick={onPaginationItemClick}
        onPaginationAction={onPaginationAction}
        pageLimit={pageLimit}
        pageRange={pageRange}
        totalPageCount={totalPageCount}
      />
    </section>
  );
};

export default Records;
