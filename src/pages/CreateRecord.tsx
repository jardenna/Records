import { FC } from 'react';
import CreateForm from './CreateForm';

interface CreateRecordProps {}

const CreateRecord: FC<CreateRecordProps> = () => (
  <section className="create-album-page">
    <h1>Tilføj album</h1>
    <CreateForm />
  </section>
);

export default CreateRecord;
