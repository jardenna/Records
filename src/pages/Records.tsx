import { FC, useState } from 'react';
import Select from 'react-select';
import Pagination from '../components/pagination/Pagination';
import { useGetPaginatedRecordsQuery } from '../features/records/recordsApiSlice';

const Records: FC = () => {
  const [rowsCount, setRowsCount] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);

  const { data: records } = useGetPaginatedRecordsQuery({
    page: currentPage,
    limit: rowsCount,
  });

  console.log(records);

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

  return (
    <section>
      <h1>Records</h1>
      <div>
        {rowsCount} of {records?.recordsCount} records
      </div>

      <Pagination
        currentPage={currentPage}
        handleFirstPage={handleFirstPage}
        handleLastPage={handleLastPage}
        handleNext={handleNext}
        handlePageClick={handlePageClick}
        handlePrevious={handlePrevious}
        paginationCount={paginationCount}
        startPage={startPage}
      />
      <Select
        options={options}
        onChange={(e: any) => setRowsCount(e.value)}
        value={options.find((option) => option.value === rowsCount)}
      />
    </section>
  );
};

export default Records;
