import { FC, useState } from 'react';
import Select from 'react-select';
import { useGetAllRecordsQuery } from '../features/records/recordsApiSlice';

interface RecordsProps {}

const options = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
  { value: '300', label: 'all' },
];

const Records: FC<RecordsProps> = () => {
  const [selectedOption, setSelectedOption] = useState('10');

  const { data: records } = useGetAllRecordsQuery({
    pageNo: '1',
    limit: selectedOption,
  });

  console.log(records);

  return (
    <section>
      Records{' '}
      <Select
        options={options}
        onChange={(e: any) => setSelectedOption(e.value)}
        value={selectedOption}
      />
    </section>
  );
};

export default Records;
