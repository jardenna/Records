import { FC, useState } from 'react';
import Select from 'react-select';
import Pagination from '../components/pagination/Pagination';
import { useGetPaginatedRecordsQuery } from '../features/records/recordsApiSlice';

interface RecordsProps {}

const Records: FC<RecordsProps> = () => {
  const [selectedOption, setSelectedOption] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: records } = useGetPaginatedRecordsQuery({
    pageNo: currentPage,
    limit: selectedOption,
  });

  const options = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' },
    { value: records?.recordsCount, label: 'All' },
  ];
  const paginationCount = records ? records.recordsCount / selectedOption : 1;

  const roundedPaginationCount = Math.ceil(paginationCount);
  console.log(records);

  return (
    <section>
      <h1>Records</h1>
      <button
        type="button"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <Pagination
        onSetCurrentPage={setCurrentPage}
        roundedPaginationCount={roundedPaginationCount}
        currentPage={currentPage}
      />
      <button
        type="button"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === roundedPaginationCount}
      >
        Next
      </button>
      <Select
        options={options}
        onChange={(e: any) => setSelectedOption(e.value)}
        value={selectedOption}
      />
    </section>
  );
};

export default Records;
