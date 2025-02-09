/* eslint-disable consistent-return */
import { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Records } from '../app/api/apiTypes';
import CreateOrUpdateForm from '../components/createOrUpdateForm/CreateOrUpdateForm';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import useLanguage from '../features/language/useLanguage';
import {
  useCreateOrUpdateRecordMutation,
  useGetRecordByIdQuery,
} from '../features/records/recordsApiSlice';
import { MainPath } from '../layout/nav/enums';

const UpdateRecord: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const recordParams = useParams();
  const recordId = recordParams.id;
  const { data: recordDetails } = useGetRecordByIdQuery(recordId);
  const [updateRecord, { isLoading }] = useCreateOrUpdateRecordMutation();
  const { addMessagePopup } = useMessagePopup();

  async function handleUpdateRecord(
    records: Records,
    file: File | null,
    fileName: string,
  ) {
    if (recordId) {
      try {
        const result = await updateRecord({
          id: recordId,
          records,
          file,
          fileName,
        }).unwrap();
        if (location.search) {
          navigate(`/${MainPath.Records}${location.search}`);
        } else {
          navigate(`/${MainPath.Records}`);
        }
        addMessagePopup({
          message: language.albumUpdatedSuccessfully,
          messagePopupType: 'success',
        });

        return result;
      } catch (error: any) {
        addMessagePopup({
          messagePopupType: 'error',
          message: error.data.message,
          componentType: 'notification',
          position: 'top-center',
        });
      }
    }
  }

  return (
    recordDetails && (
      <CreateOrUpdateForm
        recordDetails={recordDetails}
        onUpdateRecord={handleUpdateRecord}
        isLoading={isLoading}
        title={language.updateAlbum}
      />
    )
  );
};

export default UpdateRecord;
