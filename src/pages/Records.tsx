import { FC, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { SortOrder } from '../app/api/apiTypes';
import SelectBox, { Option } from '../components/formElements/SelectBox';
import MetaTags from '../components/MetaTags';
import Pagination from '../components/pagination/Pagination';
import usePagination from '../components/pagination/usePagination';
import RecordTable from '../components/recordTable/RecordTable';
import { useGetPaginatedRecordsQuery } from '../features/records/recordsApiSlice';
import useFormValidation from '../hooks/useFormValidation';
import { ChangeInputType } from '../types/types';

const Records: FC = () => {
  const location = useLocation();
  const defaultOptionValue = 10;
  const pageLimit = 5;
  const tableHeaders = ['artist', 'title', 'prodYear', 'label', 'origin'];
  const [sortingField, setSortingField] = useState('createdAt');
  const [sortingOrder, setSortingOrder] = useState(SortOrder.Desc);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const { artist, label, title, limit, sortOrder, sortField, page } =
    Object.fromEntries(searchParams);

  const initialState = {
    limit: limit || defaultOptionValue.toString(),
    artist: '',
    title: '',
    label: '',
  };

  const { onCustomChange, values, onChange } = useFormValidation({
    initialState,
  });
  const selectedPage = Number(page) || currentPage;
  const { data: records } = useGetPaginatedRecordsQuery({
    page: selectedPage,
    limit: Number(limit) || Number(values.limit),
    sortField: sortField || sortingField,
    sortOrder: (sortOrder as SortOrder) || sortingOrder,
    artist: artist || values.artist,
    title: title || values.title,
    label: label || values.label,
  });

  const totalCount = records ? records.recordsCount : Number(values.limit);

  const {
    pageRange,
    totalPageCount,
    onPaginationItemClick,
    onPaginationAction,
  } = usePagination({
    totalCount,
    rowsPerPage: Number(values.limit),
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

  return (
    <section>
      <MetaTags
        description="This is the records page description"
        keywords="records, music, artists"
        title="Album table"
      />

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
      <div>
        {Number(values.limit)} of {records?.recordsCount}-{selectedPage}
        {/* btn 1 = 1 - 10 records
       btn 2 = 11 - 21 records
       btn 3 = 22 - 32 records */}
      </div>
      <Pagination
        currentPage={selectedPage}
        onPaginationItemClick={onPaginationItemClick}
        onPaginationAction={onPaginationAction}
        pageLimit={pageLimit}
        pageRange={pageRange}
        totalPageCount={totalPageCount}
      />
      <form onSubmit={(event) => event.preventDefault()}>
        <SelectBox
          name="limit"
          options={[
            { value: defaultOptionValue, label: defaultOptionValue.toString() },
            { value: 20, label: '20' },
            { value: 50, label: '50' },
            { value: totalCount, label: 'All' },
          ]}
          id="limit"
          onChange={(selectedOptions) =>
            handleSetRowsCount('limit', selectedOptions as Option)
          }
          labelText="Results per page"
          defaultValue={{
            value: Number(limit) || 10,
            label: limit || defaultOptionValue.toString(),
          }}
        />
      </form>
    </section>
  );
};

export default Records;
