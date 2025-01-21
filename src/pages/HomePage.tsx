import { FC } from 'react';
import RecordList from '../components/recordList/RecordList';
import SkeletonList from '../components/skeleton/SkeletonList';
import { useGetFirstSixRecordsQuery } from '../features/records/recordsApiSlice';

const HomePage: FC = () => {
  const { data: records, isLoading, refetch } = useGetFirstSixRecordsQuery();

  return (
    <section aria-label={isLoading ? 'Loading' : undefined}>
      {isLoading ? (
        <SkeletonList count={6} variant="img" className="grid three-col" />
      ) : (
        <RecordList records={records} refetch={refetch} />
      )}
    </section>
  );
};

export default HomePage;
