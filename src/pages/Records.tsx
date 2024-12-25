import { FC, useState } from 'react';
import { useSearchParams } from 'react-router';
import { SortOrder } from '../app/api/apiTypes';
import Input from '../components/formElements/Input';
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
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState(SortOrder.Desc);
  const [filteredArtists, setFilteredArtists] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = searchParams.get('limit');
  const filterValue = searchParams.get('filter');
  const sortOrderParam = searchParams.get('sortOrder');
  const sortFieldParam = searchParams.get('sortField');

  const initialState = {
    limit: limit || '10',
  };

  const { onCustomChange, values } = useFormValidation({
    initialState,
  });

  const { data: records } = useGetPaginatedRecordsQuery({
    page: currentPage,
    limit: Number(limit) || Number(values.limit),
    sortField: sortFieldParam || sortField,
    sortOrder: (sortOrderParam as SortOrder) || sortOrder,
    artist: filterValue || filteredArtists,
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
    if (sortField === field) {
      setSortOrder(
        sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc,
      );
    } else {
      setSortField(field);
      searchParams.set('sortField', field);
      searchParams.set('sortOrder', sortOrder);
      setSortOrder(SortOrder.Asc);
      setSearchParams(searchParams);
    }
  };

  const handleFilterArtists = (event: ChangeInputType) => {
    const { value } = event.target;
    searchParams.set('filter', value.trim());
    setSearchParams(searchParams);
    setFilteredArtists(value);
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
          value={filterValue || filteredArtists}
          onChange={handleFilterArtists}
          labelText="Filter by artist"
        />
      </form>
      <h1>Records</h1>
      {records && <RecordTable records={records.results} onSort={handleSort} />}
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
    </section>
  );
};

export default Records;
