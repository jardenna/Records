import { FC } from 'react';
import { useNavigate } from 'react-router';
import { OmittedRecordRequest, Records } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';
import MetaTags from '../MetaTags';
import FieldSet from '../fieldset/FieldSet';
import Input from '../formElements/Input';
import Textarea from '../formElements/Textarea';
import FileInput from '../formElements/fileInput/FileInput';
import Form from '../formElements/form/Form';
import validateUpdate, {
  minimumYear,
} from '../formElements/validation/validateUpdate';
import RecordImg from '../shared/recordImg/RecordImg';
import SkeletonGrid from '../skeleton/SkeletonGrid';
import './_create-update-form.scss';

interface CreateOrUpdateFormProps {
  title: string;
  isLoading?: boolean;
  recordDetails?: OmittedRecordRequest;
  onUpdateRecord: (
    records: Records,
    file: File | null,
    fileName: string,
    previewUrl: string | null,
  ) => void;
}

const CreateOrUpdateForm: FC<CreateOrUpdateFormProps> = ({
  recordDetails,
  onUpdateRecord,
  isLoading,
  title,
}) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const maxYear = new Date().getFullYear() + 1;
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
    cover: recordDetails?.cover ?? '',
  };

  const { onSubmit, onChange, onBlur, values, errors, fileData } =
    useFormValidation({
      initialState,
      callback: handleSubmit,
      validate,
      isLoading,
    });

  function validate() {
    return validateUpdate(values, language);
  }

  function handleSubmit() {
    onUpdateRecord(
      values as Records,
      fileData.file,
      fileData.name,
      fileData.preview,
    );
  }

  return (
    <>
      <MetaTags
        description="This is the records page description"
        keywords="records, music, artists"
        title={title}
      />

      <section aria-label={isLoading ? 'Loading' : undefined}>
        {isLoading ? (
          <SkeletonGrid />
        ) : (
          <Form
            onSubmit={onSubmit}
            onCancel={() => navigate(-1)}
            labelText={title}
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            ariaLabel={isLoading ? 'Loading' : undefined}
            isLoading={isLoading}
            className="create-update-form"
          >
            <div className="grid three-col">
              <FieldSet legendText={language.albumInfo}>
                <Input
                  name="artist"
                  id="artist"
                  onChange={onChange}
                  onBlur={onBlur}
                  errorText={errors.artist}
                  value={values.artist}
                  labelText={language.artist}
                  required
                />
                <Input
                  name="title"
                  id="title"
                  onChange={onChange}
                  onBlur={onBlur}
                  errorText={
                    errors.title && `${language.pleaseEnter} ${language.title}`
                  }
                  value={values.title}
                  labelText={language.title}
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
                  labelText={language.prodYear}
                  maxLength={4}
                  required
                />
                <Input
                  name="released"
                  id="released"
                  onChange={onChange}
                  value={values.released !== '0' ? values.released || '' : ''}
                  labelText={language.released}
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
                  labelText={language.label}
                />
                <Input
                  name="recordNo"
                  id="recordNo"
                  onChange={onChange}
                  value={values.recordNo}
                  labelText={language.recordNo}
                />
              </FieldSet>

              <FieldSet legendText={language.additionalInfo}>
                <Input
                  name="numOfRecords"
                  id="numOfRecords"
                  onChange={onChange}
                  labelText={language.numOfRecords}
                  type="number"
                  value={values.numOfRecords || ''}
                />
                <Input
                  name="price"
                  id="price"
                  onChange={onChange}
                  labelText={language.price}
                  value={values.price}
                />
                <Textarea
                  name="origin"
                  id="origin"
                  value={values.origin}
                  onChange={onChange}
                  labelText={language.origin}
                />
                <Textarea
                  name="info"
                  id="info"
                  value={values.info}
                  onChange={onChange}
                  labelText={language.niceToKnow}
                />
              </FieldSet>

              <FieldSet legendText={language.cover}>
                <FileInput
                  onChange={onChange}
                  name="cover"
                  id="cover"
                  labelText={language.upLoadCover}
                  title={fileData.file?.name || language.noFileChosen}
                />
                <RecordImg
                  src={recordDetails?.cover || 'default.png'}
                  previewUrl={fileData.preview || null}
                  alt=""
                />
              </FieldSet>
            </div>
          </Form>
        )}
      </section>
    </>
  );
};

export default CreateOrUpdateForm;
