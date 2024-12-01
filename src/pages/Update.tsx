import { FC } from 'react';
import { useParams } from 'react-router';
import Form from '../components/formElements/form/Form';
import Input from '../components/formElements/Input';
import Textarea from '../components/formElements/Textarea';
import ImagePreview from '../components/ImagePreview';
import { useCreateNewRecordMutation } from '../features/records/recordsApiSlice';
import useFormValidation from '../hooks/useFormValidation';

interface UpdateProps {}

const Update: FC<UpdateProps> = () => {
  const recordId = useParams().id;
  console.log(recordId);

  const initialCreateState = {
    artist: '',
    title: '',
    prodYear: '',
    label: '',
    origin: '',
    price: '',
    recordNo: '',
    numOfRecords: 1,
    released: '',
    info: '',
  };

  const { onSubmit, onChange, onBlur, values, errors } = useFormValidation({
    initialState: initialCreateState,
    callback: handleSubmit,
  });

  const [createRecord] = useCreateNewRecordMutation();

  async function handleSubmit() {
    try {
      const result = await createRecord(values).unwrap();
      console.log('Record created successfully:', result);
    } catch (error) {
      console.error('Failed to create record:', error);

      // Handle the error
    }
  }
  const maxYear = new Date().getFullYear() + 1;

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
              type="number"
              min={1900}
              max={maxYear}
              value={values.prodYear}
              labelText="Produktions år"
              maxLength={4}
              required
            />
            <Input
              name="released"
              id="released"
              onChange={onChange}
              value={values.released}
              labelText="Senest udgivet"
              min={Number(values.prodYear) + 1}
              max={maxYear}
              type="number"
              maxLength={4}
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
              labelText="Antal LP(er)"
              type="number"
              value={values.numOfRecords}
            />
            <Input
              name="price"
              id="price"
              onChange={onChange}
              labelText="Pris"
              value={values.price}
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
