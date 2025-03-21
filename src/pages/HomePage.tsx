import { FC } from 'react';
import RecordList from '../components/recordList/RecordList';
import SkeletonList from '../components/skeleton/SkeletonList';
import { useGetLatestSixRecordsQuery } from '../features/records/recordsApiSlice';

const HomePage: FC = () => {
  const { data: records, isLoading, refetch } = useGetLatestSixRecordsQuery();

  return (
    <div aria-label={isLoading ? 'Loading' : undefined}>
      {isLoading ? (
        <SkeletonList count={6} variant="img" className="grid three-col" />
      ) : (
        <RecordList records={records?.results} refetch={refetch} />
      )}
    </div>
  );
};

export default HomePage;
