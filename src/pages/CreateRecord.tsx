/* eslint-disable consistent-return */
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Records } from '../app/api/apiTypes';
import { useCreateNewRecordMutation } from '../features/records/recordsApiSlice';
import { MainPath } from '../types/enums';
import CreateForm from './CreateForm';

const CreateRecord: FC = () => {
  const navigate = useNavigate();
  const [createRecord, { isLoading }] = useCreateNewRecordMutation();

  const handleCreateRecord = async (values: Records) => {
    try {
      const result = await createRecord(values).unwrap();
      navigate(`/${MainPath.Records}`);
      return result;
    } catch (error) {
      console.log(error, 34);
    }
  };

  return (
    <section className="create-album-page">
      <h1>Tilføj album</h1>
      <CreateForm onCreateRecord={handleCreateRecord} isLoading={isLoading} />
    </section>
  );
};

export default CreateRecord;
