import { FC, useState } from 'react';
import Select from 'react-select';
import Pagination from '../components/pagination/Pagination';
import { useGetPaginatedRecordsQuery } from '../features/records/recordsApiSlice';

interface RecordsProps {}

const Records: FC<RecordsProps> = () => {
  const [selectedOption, setSelectedOption] = useState('10');

  const { data: records } = useGetPaginatedRecordsQuery({
    pageNo: '2',
    limit: selectedOption,
  });

  const options = [
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '50', label: '50' },
    { value: records?.recordsCount, label: 'All' },
  ];
  console.log(records);

  return (
    <section>
      <h1>Records</h1>
      <Pagination />
      <Select
        options={options}
        onChange={(e: any) => setSelectedOption(e.value)}
        value={selectedOption}
      />
    </section>
  );
};

export default Records;
