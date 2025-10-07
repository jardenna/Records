import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Records } from '../app/api/apiTypes';
import CreateOrUpdateForm from '../components/createOrUpdateForm/CreateOrUpdateForm';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import useLanguage from '../features/language/useLanguage';
import { useCreateOrUpdateRecordMutation } from '../features/records/recordsApiSlice';
import { MainPath } from '../layout/nav/enums';
import handleApiError from '../utils/handleApiError';

const CreateRecordPage: FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [createRecord, { isLoading }] = useCreateOrUpdateRecordMutation();
  const { addMessagePopup } = useMessagePopup();

  const handleCreateRecord = async (
    records: Records,
    file: File | null,
    fileName: string,
  ) => {
    try {
      const result = await createRecord({
        records,
        file,
        fileName,
      }).unwrap();

      navigate(`/${MainPath.Records}`);

      addMessagePopup({
        message: language.albumCreated,
        messagePopupType: 'success',
      });

      return result;
    } catch (error) {
      handleApiError(error, addMessagePopup);
    }
  };

  return (
    <CreateOrUpdateForm
      onUpdateRecord={handleCreateRecord}
      isLoading={isLoading}
      title={language.createAlbum}
    />
  );
};

export default CreateRecordPage;
