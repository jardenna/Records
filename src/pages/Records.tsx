import { FC, useState } from 'react';
import Select from 'react-select';
import '../components/pagination/_pagination.scss';
import PaginationItems from '../components/pagination/PaginationItems';
import { useGetPaginatedRecordsQuery } from '../features/records/recordsApiSlice';

const Records: FC = () => {
  const [rowsCount, setRowsCount] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);

  const { data: records } = useGetPaginatedRecordsQuery({
    page: currentPage,
    limit: rowsCount,
  });

  const options = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' },
    { value: records?.recordsCount, label: 'All' },
  ];

  const pageLimit = 5;
  const paginationCount = records
    ? Math.ceil(records.recordsCount / rowsCount)
    : 1;

  const handlePrevious = () => {
    const newStartPage = Math.max(startPage - pageLimit, 1);
    setStartPage(newStartPage);
    setCurrentPage(newStartPage);
  };

  const handleNext = () => {
    const newStartPage = Math.min(
      startPage + pageLimit,
      paginationCount - pageLimit + 1,
    );
    setStartPage(newStartPage);
    setCurrentPage(newStartPage);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    if (page < startPage) {
      setStartPage(page);
    } else if (page >= startPage + pageLimit) {
      setStartPage(page - pageLimit + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
    setStartPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(paginationCount);
    setStartPage(paginationCount - pageLimit + 1);
  };

  const endPage = Math.min(startPage + pageLimit - 1, paginationCount);
  const pageRange = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <section>
      <h1>Records</h1>
      <div>
        {rowsCount} of {records?.recordsCount} records
      </div>
      <ul className="pagination">
        {/* Jump Previous */}
        {startPage > 1 && (
          <li className="pagination-item">
            <button type="button" onClick={handlePrevious}>
              Jump Previous
            </button>
          </li>
        )}

        {/* First Page */}
        <li className="pagination-item">
          <button
            type="button"
            onClick={handleFirstPage}
            disabled={currentPage === 1}
          >
            First
          </button>
        </li>

        {/* Prev Page */}
        <li className="pagination-item">
          <button
            type="button"
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>

        {/* Page Numbers */}
        {pageRange.map((page) => (
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
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === paginationCount}
          >
            Next
          </button>
        </li>

        {/* Jump Next */}
        {endPage < paginationCount && (
          <li className="pagination-item">
            <button type="button" onClick={handleNext}>
              Jump Next
            </button>
          </li>
        )}

        {/* Last Page */}
        <li className="pagination-item">
          <button
            type="button"
            onClick={handleLastPage}
            disabled={currentPage === paginationCount}
          >
            Last
          </button>
        </li>
      </ul>

      <Select
        options={options}
        onChange={(e: any) => setRowsCount(e.value)}
        value={options.find((option) => option.value === rowsCount)}
      />
    </section>
  );
};

export default Records;
