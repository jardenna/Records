/* eslint-disable consistent-return */
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Records } from '../app/api/apiTypes';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import useLanguage from '../features/language/useLanguage';
import { useCreateNewRecordMutation } from '../features/records/recordsApiSlice';
import { MainPath } from '../types/enums';
import CreateForm from './CreateForm';

const CreateRecord: FC = () => {
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
  console.log(language.createAlbum);

  return (
    <section className="create-album-page">
      <CreateForm
        onCreateRecord={handleCreateRecord}
        isLoading={isLoading}
        title={language.createAlbum}
      />
    </section>
  );
};

export default CreateRecord;
