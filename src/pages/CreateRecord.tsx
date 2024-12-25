/* eslint-disable consistent-return */
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Records } from '../app/api/apiTypes';
import { useCreateNewRecordMutation } from '../features/records/recordsApiSlice';
import { MainPath } from '../types/enums';
import CreateForm from './CreateForm';

interface CreateRecordProps {}

const CreateRecord: FC<CreateRecordProps> = () => {
  const navigate = useNavigate();
  const [createRecord, { isLoading, isError, error }] =
    useCreateNewRecordMutation();
  console.log({ isError, error });

  const handleCreateRecord = async (values: Records) => {
    try {
      const result = await createRecord(values).unwrap();
      navigate(`/${MainPath.Records}`);
      // if (!result.error) {
      //   navigate(`/${MainPath.Records}`);
      // } else {
      //   console.log(result.error, 34);
      // }
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
