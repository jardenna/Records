/* eslint-disable consistent-return */
import { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Records } from '../app/api/apiTypes';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import CreateForm from '../components/shared/CreateForm';
import useLanguage from '../features/language/useLanguage';
import {
  useGetRecordByIdQuery,
  useUpdateRecordMutation,
} from '../features/records/recordsApiSlice';
import { MainPath } from '../types/enums';

const UpdateRecord: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const recordParams = useParams();
  const recordId = recordParams.id;
  const { data: recordDetails } = useGetRecordByIdQuery(recordId);
  const [updateRecord, { isLoading }] = useUpdateRecordMutation();
  const { addMessagePopup } = useMessagePopup();

  async function handleUpdateRecord(
    values: Records,
    file: File | null,
    fileName: string,
    imgUpdated: boolean,
  ) {
    if (recordId) {
      try {
        const result = await updateRecord({
          id: recordId,
          record: values,
          file,
          fileName,
          imgUpdated,
        }).unwrap();
        if (location.search) {
          navigate(`/${MainPath.Records}${location.search}`);
        } else {
          navigate(`/${MainPath.Records}`);
        }
        addMessagePopup({
          message: 'Record updated successfully',
          messagePopupType: 'success',
        });

        return result;
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    recordDetails && (
      <CreateForm
        recordDetails={recordDetails}
        onUpdateRecord={handleUpdateRecord}
        isLoading={isLoading}
        title={language.updateAlbum}
      />
    )
  );
};

export default UpdateRecord;
