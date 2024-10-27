import { FC } from 'react';
import { useGetAllRecordsQuery } from '../features/records/recordsApiSlice';

interface RecordsProps {}

const Records: FC<RecordsProps> = () => {
  const { data: records } = useGetAllRecordsQuery({ pageNo: '2', limit: '2' });
  console.log(records);

  return <section>Records</section>;
};

export default Records;
