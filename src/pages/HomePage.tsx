import { FC } from 'react';
import RecordList from '../components/recordList/RecordList';
import { useGetFirstSixRecordsQuery } from '../features/records/recordsApiSlice';

const HomePage: FC = () => {
  const { data: records, isLoading } = useGetFirstSixRecordsQuery();

  return (
    <section className="block-container">
      {isLoading ? (
        <span>loading...</span>
      ) : (
        <ul>
          <RecordList records={records.results} />
        </ul>
      )}
    </section>
  );
};

export default HomePage;
