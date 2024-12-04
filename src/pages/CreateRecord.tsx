import { FC } from 'react';
import { Records } from '../app/api/apiTypes';
import { useCreateNewRecordMutation } from '../features/records/recordsApiSlice';
import CreateForm from './CreateForm';

interface CreateRecordProps {}

const CreateRecord: FC<CreateRecordProps> = () => {
  const [createRecord] = useCreateNewRecordMutation();

  // eslint-disable-next-line consistent-return
  const handleCreateRecord = async (values: Records) => {
    try {
      const result = await createRecord(values);

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="create-album-page">
      <h1>Tilføj album</h1>
      <CreateForm onCreateRecord={handleCreateRecord} />
    </section>
  );
};

export default CreateRecord;
