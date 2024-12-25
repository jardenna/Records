import { FC } from 'react';
import { OmittedRecordRequest, Records } from '../app/api/apiTypes';
import Form from '../components/formElements/form/Form';
import Input from '../components/formElements/Input';
import Textarea from '../components/formElements/Textarea';
import validateUpdate, {
  minimumYear,
} from '../components/formElements/validation/validateUpdate';
import ImagePreview from '../components/ImagePreview';
import MetaTags from '../components/MetaTags';
import useFormValidation from '../hooks/useFormValidation';

interface CreateFormProps {
  isLoading?: boolean;
  onCreateRecord?: any;
  onUpdateRecord?: (values: Records) => void;
  recordDetails?: OmittedRecordRequest;
}

const CreateForm: FC<CreateFormProps> = ({
  recordDetails,
  onUpdateRecord,
  onCreateRecord,
  isLoading,
}) => {
  const initialState = {
    artist: recordDetails?.artist ?? '',
    title: recordDetails?.title ?? '',
    prodYear: recordDetails?.prodYear ?? '',
    label: recordDetails?.label ?? '',
    origin: recordDetails?.origin ?? '',
    price: recordDetails?.price ?? '',
    recordNo: recordDetails?.recordNo ?? '',
    numOfRecords: recordDetails?.numOfRecords ?? 1,
    released: recordDetails?.released ?? '',
    info: recordDetails?.info ?? '',
  };

  const { onSubmit, onChange, onBlur, values, errors } = useFormValidation({
    initialState,
    callback: handleSubmit,
    validate: validateUpdate,
  });

  function handleSubmit() {
    if (onUpdateRecord) {
      onUpdateRecord(values as Records);
    } else {
      onCreateRecord(values as Records);
    }
  }
  const maxYear = new Date().getFullYear() + 1;

  return (
    <section className="create-album-page">
      <MetaTags
        description="This is the records page description"
        keywords="records, music, artists"
        title="Create Album"
      />
      <Form onSubmit={onSubmit} labelText="Tilføj album" isLoading={isLoading}>
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
              min={minimumYear}
              max={maxYear}
              value={values.prodYear || ''}
              labelText="Produktions år"
              maxLength={4}
              required
            />
            <Input
              name="released"
              id="released"
              onChange={onChange}
              value={values.released || ''}
              labelText="Senest udgivet"
              min={Number(values.prodYear) + 1 && minimumYear}
              max={maxYear}
              type="number"
              maxLength={4}
              errorText={errors.released}
              onBlur={onBlur}
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
              value={values.numOfRecords || ''}
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
            previewUrl="/images/default.png"
            uploadedPhoto="/images/default.png"
          />
        </div>
      </Form>
    </section>
  );
};

export default CreateForm;
