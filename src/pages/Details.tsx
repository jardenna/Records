import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetRecordByIdQuery } from '../features/records/recordsApiSlice';

interface DetailsProps {}

const Details: FC<DetailsProps> = () => {
  const { id } = useParams();
  const { data: selectedRecord, isLoading } = useGetRecordByIdQuery(id);
  console.log(selectedRecord, isLoading);

  return (
    <section className="details">
      <header>
        <h2>artist</h2>
      </header>
    </section>
  );
};
export default Details;
