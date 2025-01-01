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
  const pageLimit = 5;
  const [sortFields, setSortField] = useState('createdAt');
  const [sortOrders, setSortOrder] = useState(SortOrder.Desc);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  const { artist, title, limit, sortOrder, sortField } =
    Object.fromEntries(searchParams);

  const initialState = {
    limit: limit || '10',
    artist: '',
    title: '',
  };

  const { onCustomChange, values, onChange } = useFormValidation({
    initialState,
  });

  const { data: records } = useGetPaginatedRecordsQuery({
    page: currentPage,
    limit: Number(limit) || Number(values.limit),
    sortField: sortField || sortFields,
    sortOrder: (sortOrder as SortOrder) || sortOrders,
    artist: artist || values.artist,
    title: title || values.title,
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
    currentPage,
    setCurrentPage,
  });

  const handleSort = (field: string) => {
    searchParams.set('sortField', field);
    searchParams.set('sortOrder', sortOrders);
    setSearchParams(searchParams);
    if (sortFields === field) {
      setSortOrder(
        sortOrders === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc,
      );
    } else {
      setSortField(field);
      setSortOrder(SortOrder.Asc);
    }
  };

  const handleTest = (event: ChangeInputType) => {
    const { name, value } = event.target;
    searchParams.set(name, value.trim());
    setSearchParams(searchParams);
    onChange(event);
  };

  const handleSetRowsCount = (name: string, selectedOptions: Option) => {
    searchParams.set('limit', selectedOptions.value.toString());
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
          sortField={sortFields}
          sortOrder={sortOrders}
          onFilterRecords={handleTest}
          values={values}
          valuesFromSearch={Object.fromEntries(searchParams)}
        />
      )}
      <div>
        {Number(values.limit)} of {records?.recordsCount} {currentPage}
        25
        {/* btn 1 = 1 - 10 records
       btn 2 = 11 - 21 records
       btn 3 = 22 - 32 records */}
      </div>
      <Pagination
        currentPage={currentPage}
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
            { value: 10, label: '10' },
            { value: 20, label: '20' },
            { value: 50, label: '50' },
            { value: totalCount, label: 'All' },
          ]}
          id="limit"
          onChange={(selectedOptions) =>
            handleSetRowsCount('limit', selectedOptions as Option)
          }
          labelText="Results per page"
          defaultValue={{ value: Number(limit) || 10, label: limit || '10' }}
        />
      </form>
    </section>
  );
};

export default Records;
