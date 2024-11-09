import { FC, useState } from 'react';
import Select from 'react-select';
import PaginationItems from '../components/pagination/PaginationItems';
import usePagination from '../components/pagination/usePagination';
import RecordTable from '../components/recordTable/RecordTable';
import { useGetPaginatedRecordsQuery } from '../features/records/recordsApiSlice';

import '../components/pagination/_pagination.scss';

const Records: FC = () => {
  const [rowsCount, setRowsCount] = useState(10);

  // Initialize the pagination hook
  const {
    currentPage,
    pageRange,
    totalPageCount,
    handlePageClick, // keep this for specific page clicks
  } = usePagination({
    totalCount: 70, // initial count set to 0 until records data is available
    rowsPerPage: rowsCount,
    pageLimit: 5,
  });

  // Fetch records based on the current page and rows per page
  const { data: records } = useGetPaginatedRecordsQuery({
    page: currentPage,
    limit: rowsCount,
  });

  // Update total count in usePagination when records are fetched
  const totalCount = records?.recordsCount || 0;

  // Unified pagination handler
  const handlePaginationAction = (action: string) => {
    switch (action) {
      case 'first':
        handlePageClick(1);
        break;
      case 'prev':
        handlePageClick(currentPage - 1);
        break;
      case 'next':
        handlePageClick(currentPage + 1);
        break;
      case 'last':
        handlePageClick(totalPageCount);
        break;
      case 'jump-prev':
        // Assuming jump is by 5 pages; adjust as needed
        handlePageClick(Math.max(1, currentPage - 5));
        break;
      case 'jump-next':
        handlePageClick(Math.min(totalPageCount, currentPage + 5));
        break;
      default:
        break;
    }
  };

  return (
    <section>
      <h1>Records</h1>
      {records && <RecordTable records={records.results} />}
      <div>
        {rowsCount} of {totalCount} records
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
