/* eslint-disable consistent-return */
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Records } from '../app/api/apiTypes';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import CreateForm from '../components/shared/CreateForm';
import useLanguage from '../features/language/useLanguage';
import { useCreateNewRecordMutation } from '../features/records/recordsApiSlice';
import { MainPath } from '../types/enums';
import PhotoTest from './PhotoTest';

const CreateRecordPage: FC = () => {
  const navigate = useNavigate();
  const [createRecord, { isLoading }] = useCreateNewRecordMutation();
  const { addMessagePopup } = useMessagePopup();

  const handleCreateRecord = async (values: Records) => {
    try {
      const result = await createRecord(values).unwrap();
      navigate(`/${MainPath.Records}`);
      addMessagePopup({
        message: 'Record Created successfully',
        messagePopupType: 'success',
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const { language } = useLanguage();

  return (
    <>
      <PhotoTest />
      <CreateForm
        onCreateRecord={handleCreateRecord}
        isLoading={isLoading}
        title={language.createAlbum}
      />
    </>
  );
};

export default CreateRecordPage;
