import { FC, useState } from 'react';
import Select from 'react-select';
import usePagination from '../components/pagination/usePagination';
import RecordTable from '../components/recordTable/RecordTable';
import {
  useGetAmountOfRecordsQuery,
  useGetPaginatedRecordsQuery,
} from '../features/records/recordsApiSlice';

import '../components/pagination/_pagination.scss';
import Pagination from '../components/pagination/Pagination';

const Records: FC = () => {
  const { data: recordCount } = useGetAmountOfRecordsQuery();

  const [rowsCount, setRowsCount] = useState(10);
  const totalCount = recordCount ? recordCount.totalAmountRecords : rowsCount;

  // Initialize the pagination hook
  const {
    currentPage,
    pageRange,
    totalPageCount,
    handlePageClick, // keep this for specific page clicks
    handlePaginationAction,
  } = usePagination({
    totalCount,
    rowsPerPage: rowsCount,
    pageLimit: 5,
  });

  // Fetch records based on the current page and rows per page
  const { data: records } = useGetPaginatedRecordsQuery({
    page: currentPage,
    limit: rowsCount,
  });

  return (
    <section>
      <h1>Records</h1>
      {records && <RecordTable records={records.results} />}
      <div>
        {rowsCount * currentPage} of {totalCount} records
      </div>
      <Pagination
        currentPage={currentPage}
        onPageClick={handlePageClick}
        onPaginationAction={handlePaginationAction}
        pageLimit={5}
        pageRange={pageRange}
        totalPageCount={totalPageCount}
      />

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
