import { FC } from 'react';
import { useParams } from 'react-router';
import { useGetRecordByIdQuery } from '../features/records/recordsApiSlice';
import CreateForm from './CreateForm';

const UpdateRecord: FC = () => {
  const recordParams = useParams();
  const recordId = recordParams.id;
  const { data: recordDetails } = useGetRecordByIdQuery(recordId);

  return (
    <section className="create-album-page">
      <h1>Opdater album</h1>
      {recordDetails && <CreateForm recordDetails={recordDetails} />}
    </section>
  );
};

export default UpdateRecord;
