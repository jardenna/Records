import { FC } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Records } from '../app/api/apiTypes';
import {
  useGetRecordByIdQuery,
  useUpdateRecordMutation,
} from '../features/records/recordsApiSlice';
import { MainPath } from '../types/enums';
import CreateForm from './CreateForm';

const UpdateRecord: FC = () => {
  const navigate = useNavigate();
  const recordParams = useParams();
  const recordId = recordParams.id;
  const { data: recordDetails } = useGetRecordByIdQuery(recordId);

  const [updateRecord] = useUpdateRecordMutation();

  async function handleUpdateRecord(values: Records) {
    if (recordId) {
      try {
        const result = await updateRecord({
          id: recordId,
          record: values,
        }).unwrap();

        navigate(`/${MainPath.Records}`);
        console.log('Record created successfully:', result);
      } catch (error) {
        console.error('Failed to create record:', error);

        // Handle the error
      }
    }
  }

  return (
    <section className="create-album-page">
      <h1>Opdater album</h1>
      {recordDetails && (
        <CreateForm
          recordDetails={recordDetails}
          onUpdateRecord={handleUpdateRecord}
        />
      )}
    </section>
  );
};

export default UpdateRecord;
