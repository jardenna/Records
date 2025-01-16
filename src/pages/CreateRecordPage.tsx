/* eslint-disable consistent-return */
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Records } from '../app/api/apiTypes';
import CreateOrUpdateForm from '../components/createOrUpdateForm/CreateOrUpdateForm';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import useLanguage from '../features/language/useLanguage';
import { useCreateNewRecordMutation } from '../features/records/recordsApiSlice';
import { MainPath } from '../types/enums';

const CreateRecordPage: FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [createRecord, { isLoading }] = useCreateNewRecordMutation();
  const { addMessagePopup } = useMessagePopup();

  const handleCreateRecord = async (
    records: Records,
    file: File | null,
    fileName: string,
  ) => {
    try {
      const result = await createRecord({ records, file, fileName }).unwrap();

      if (result) {
        navigate(`/${MainPath.Records}`);
      }

      addMessagePopup({
        message: language.albumCreatedSuccessfully,
        messagePopupType: 'success',
      });
      return result;
    } catch (error) {
      console.log(error);
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
