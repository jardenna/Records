import { FC } from 'react';
import RecordList from '../components/recordList/RecordList';
import { useGetFirstSixRecordsQuery } from '../features/records/recordsApiSlice';

const HomePage: FC = () => {
  const { data: records, isLoading } = useGetFirstSixRecordsQuery();

  return (
    <section>
      {isLoading ? (
        <span>loading...</span>
      ) : (
        <RecordList records={records.results} />
      )}
    </section>
  );
};

export default HomePage;
