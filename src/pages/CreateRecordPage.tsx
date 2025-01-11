/* eslint-disable consistent-return */
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Records } from '../app/api/apiTypes';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import CreateForm from '../components/shared/CreateForm';
import useLanguage from '../features/language/useLanguage';
import { useUpdateRecordMutation } from '../features/records/recordsApiSlice';
import { MainPath } from '../types/enums';

const CreateRecordPage: FC = () => {
  const navigate = useNavigate();
  const [createRecord, { isLoading }] = useUpdateRecordMutation();
  const { addMessagePopup } = useMessagePopup();

  const handleCreateRecord = async (records: Records) => {
    try {
      const result = await createRecord({ records }).unwrap();
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
    <CreateForm
      onCreateRecord={handleCreateRecord}
      isLoading={isLoading}
      title={language.createAlbum}
    />
  );
};

export default CreateRecordPage;
