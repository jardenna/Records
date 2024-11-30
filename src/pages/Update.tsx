import { FC } from 'react';
import useFormValidation from '../hooks/useFormValidation';

import Form from '../components/formElements/form/Form';
import Input from '../components/formElements/Input';
import Textarea from '../components/formElements/Textarea';
import ImagePreview from '../components/ImagePreview';
import { useCreateNewRecordMutation } from '../features/records/recordsApiSlice';

interface UpdateProps {}

const Update: FC<UpdateProps> = () => {
  const initialCreateState = {
    artist: '',
    title: '',
    prodYear: '',
    label: '',
    origin: '',
    price: '',
    recordNo: '',
    numOfRecords: '',
    released: '',
    info: '',
  };

  const { onSubmit, onChange, onBlur, values, errors } = useFormValidation({
    initialState: initialCreateState,
    callback: handleSubmit,
  });

  const [createRecord] = useCreateNewRecordMutation();

  function handleSubmit() {
    createRecord(values);
  }

  return (
    <section className="create-album-page">
      <h1>Tilføj album</h1>
      <Form onSubmit={onSubmit} labelText="Tilføj album">
        <div className="flex">
          <div className="flex column">
            <Input
              name="artist"
              id="artist"
              onChange={onChange}
              onBlur={onBlur}
              errorText={errors.artist}
              value={values.artist}
              labelText="Gruppe / Kunstner"
              required
            />
            <Input
              name="title"
              id="title"
              onChange={onChange}
              onBlur={onBlur}
              errorText={errors.title}
              value={values.title}
              labelText="Title"
              required
            />
            <Input
              name="prodYear"
              id="prodYear"
              onChange={onChange}
              onBlur={onBlur}
              errorText={errors.prodYear}
              value={values.prodYear}
              labelText="Produktions år"
              required
            />
            <Input
              name="released"
              id="released"
              onChange={onChange}
              onBlur={onBlur}
              errorText={errors.released}
              value={values.released}
              labelText="Senest udgivet"
              required
            />

            <Input
              name="label"
              id="label"
              onChange={onChange}
              value={values.label}
              labelText="Plademærke"
            />
            <Input
              name="recordNo"
              id="recordNo"
              onChange={onChange}
              value={values.recordNo}
              labelText="Pladenummer"
            />
          </div>

          <div className="flex column">
            <Input
              name="numOfRecords"
              id="numOfRecords"
              onChange={onChange}
              value={values.numOfRecords}
              labelText="Antal LP(er)"
            />
            <Input
              name="price"
              id="price"
              onChange={onChange}
              value={values.price}
              labelText="Pris"
            />
            <Textarea
              name="origin"
              id="origin"
              value={values.origin}
              onChange={onChange}
              labelText="Oprindelse"
            />
            <Textarea
              name="info"
              id="info"
              value={values.info}
              onChange={onChange}
              labelText="Værd at vide"
            />
          </div>

          <ImagePreview
            fileName="record"
            previewUrl="images/default.png"
            uploadedPhoto="images/default.png"
          />
        </div>
      </Form>
    </section>
  );
};

export default Update;
