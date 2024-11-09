import { FC, useState } from 'react';
import Select from 'react-select';
import PaginationItems from '../components/pagination/PaginationItems';
import usePagination from '../components/pagination/usePagination';
import RecordTable from '../components/recordTable/RecordTable';
import {
  useGetAllRecordsQuery,
  useGetPaginatedRecordsQuery,
} from '../features/records/recordsApiSlice';

import '../components/pagination/_pagination.scss';

const Records: FC = () => {
  const { data: recordCount } = useGetAllRecordsQuery();

  const [rowsCount, setRowsCount] = useState(10);
  const totalCount = recordCount ? recordCount.recordsCount : rowsCount;

  // Initialize the pagination hook
  const {
    currentPage,
    pageRange,
    totalPageCount,
    handlePageClick, // keep this for specific page clicks
    handlePaginationAction,
  } = usePagination({
    totalCount, // initial count set to 0 until records data is available
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
      <ul className="pagination">
        {/* Jump Previous */}
        {currentPage > 5 && (
          <li className="pagination-item">
            <button
              type="button"
              onClick={() => handlePaginationAction('jump-prev')}
            >
              Jump Previous
            </button>
          </li>
        )}

        {/* First Page */}
        <li className="pagination-item">
          <button
            type="button"
            onClick={() => handlePaginationAction('first')}
            disabled={currentPage === 1}
          >
            First
          </button>
        </li>

        {/* Prev Page */}
        <li className="pagination-item">
          <button
            type="button"
            onClick={() => handlePaginationAction('prev')}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>

        {/* Page Numbers */}
        {pageRange.map((page: any) => (
          <PaginationItems
            key={page}
            onSetCurrentPage={handlePageClick}
            paginationCount={page}
            currentPage={currentPage}
          />
        ))}

        {/* Next Page */}
        <li className="pagination-item">
          <button
            type="button"
            onClick={() => handlePaginationAction('next')}
            disabled={currentPage === totalPageCount}
          >
            Next
          </button>
        </li>

        {/* Jump Next */}
        {currentPage < totalPageCount - 5 && (
          <li className="pagination-item">
            <button
              type="button"
              onClick={() => handlePaginationAction('jump-next')}
            >
              Jump Next
            </button>
          </li>
        )}

        {/* Last Page */}
        <li className="pagination-item">
          <button
            type="button"
            onClick={() => handlePaginationAction('last')}
            disabled={currentPage === totalPageCount}
          >
            Last
          </button>
        </li>
      </ul>

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
