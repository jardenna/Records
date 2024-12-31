import { FC, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { SortOrder } from '../app/api/apiTypes';
import Input from '../components/formElements/Input';
import SelectBox, { Option } from '../components/formElements/SelectBox';
import MetaTags from '../components/MetaTags';
import Pagination from '../components/pagination/Pagination';
import usePagination from '../components/pagination/usePagination';
import RecordTable from '../components/recordTable/RecordTable';
import { useGetPaginatedRecordsQuery } from '../features/records/recordsApiSlice';
import useFormValidation from '../hooks/useFormValidation';

const Records: FC = () => {
  const pageLimit = 5;
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState(SortOrder.Desc);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get('limit');
  const filterValue = searchParams.get('artist');
  const filterValueTitle = searchParams.get('title');
  const sortOrderParam = searchParams.get('sortOrder');
  const sortFieldParam = searchParams.get('sortField');
  const location = useLocation();

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
    sortField: sortFieldParam || sortField,
    sortOrder: (sortOrderParam as SortOrder) || sortOrder,
    artist: filterValue || values.artist,
    title: filterValueTitle || values.title,
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
    searchParams.set('sortOrder', sortOrder);
    setSearchParams(searchParams);
    if (sortField === field) {
      setSortOrder(
        sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc,
      );
    } else {
      setSortField(field);
      setSortOrder(SortOrder.Asc);
    }
  };

  const handleTest = (event: any) => {
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
          sortField={sortField}
          sortOrder={sortOrder}
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
        <Input
          type="search"
          name="artist"
          id="artist"
          placeholder="Filter by artist"
          value={filterValue || values.artist}
          onChange={handleTest}
          labelText="Filter by artist"
        />
        <Input
          type="search"
          name="title"
          id="title"
          placeholder="Filter by title"
          value={filterValueTitle || values.title}
          onChange={handleTest}
          labelText="Filter by title"
        />
      </form>
    </section>
  );
};

export default Records;
