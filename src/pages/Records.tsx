import { FC } from 'react';
import { useGetAllRecordsQuery } from '../features/records/recordsApiSlice';

interface RecordsProps {}

const Records: FC<RecordsProps> = () => {
  const { data: records } = useGetAllRecordsQuery({ pageNo: 5, limit: 7 });
  console.log(records);

  return <section>Records</section>;
};

export default Records;
