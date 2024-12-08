import { FC, useState } from 'react';
import Select from 'react-select';
import { SortOrder } from '../app/api/apiTypes';
import Pagination from '../components/pagination/Pagination';
import usePagination from '../components/pagination/usePagination';
import RecordTable from '../components/recordTable/RecordTable';
import { useGetPaginatedRecordsQuery } from '../features/records/recordsApiSlice';

const Records: FC = () => {
  // const { data: recordCount } = useGetAmountOfRecordsQuery();

  const [rowsCount, setRowsCount] = useState(10);

  const pageLimit = 5;
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState(SortOrder.Desc);
  const [filters, setFilters] = useState<any>({ artist: '', title: '' });
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch records based on the current page and rows per page
  const { data: records } = useGetPaginatedRecordsQuery({
    page: currentPage,
    limit: rowsCount,
    sortField,
    sortOrder,
    artist: filters.artist,
  });

  const totalCount = records ? records.recordsCount : rowsCount;
  // Initialize the pagination hook
  const {
    pageRange,
    totalPageCount,
    onPaginationItemClick, // keep this for specific page clicks
    onPaginationAction,
  } = usePagination({
    totalCount,
    rowsPerPage: rowsCount,
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
      setSortOrder(SortOrder.Asc);
    }
  };

  const handleFilter = (e: any) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <section>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="artist"
          id="artist"
          placeholder="Filter by artist"
          value={filters.artist}
          onChange={handleFilter}
        />

        <input
          type="text"
          placeholder="Filter by title"
          value={filters.title}
          name="title"
          id="title"
          onChange={handleFilter}
        />
      </form>
      <h1>Records</h1>
      {records && <RecordTable records={records.results} onSort={handleSort} />}
      <div>
        {rowsCount} of {records?.recordsCount} {currentPage}
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
      Results per page
      <Select
        options={[
          { value: 10, label: '10' },
          { value: 20, label: '20' },
          { value: 50, label: '50' },
          { value: totalCount, label: 'All' },
        ]}
        onChange={(e: any) => setRowsCount(e.value)}
        value={{ value: rowsCount, label: String(rowsCount) }}
      />
    </section>
  );
};

export default Records;
