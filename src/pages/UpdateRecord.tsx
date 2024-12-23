import { FC } from 'react';
import { useParams } from 'react-router';
import { Records } from '../app/api/apiTypes';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import {
  useGetRecordByIdQuery,
  useUpdateRecordMutation,
} from '../features/records/recordsApiSlice';
import CreateForm from './CreateForm';

const UpdateRecord: FC = () => {
  const recordParams = useParams();
  const recordId = recordParams.id;
  const { data: recordDetails } = useGetRecordByIdQuery(recordId);
  const [updateRecord, { isLoading }] = useUpdateRecordMutation();
  const { addMessagePopup } = useMessagePopup();

  async function handleUpdateRecord(values: Records) {
    if (recordId) {
      try {
        await updateRecord({
          id: recordId,
          record: values,
        }).unwrap();

        addMessagePopup({
          message: 'Record created successfully',
          messagePopupType: 'success',
        });
      } catch (error) {
        addMessagePopup({
          message: 'Failed to create record',
          messagePopupType: 'error',
          componentType: 'notification',
        });
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
          isLoading={isLoading}
        />
      )}
    </section>
  );
};

export default UpdateRecord;
