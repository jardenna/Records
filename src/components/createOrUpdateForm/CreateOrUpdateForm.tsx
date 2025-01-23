import { FC } from 'react';
import { useNavigate } from 'react-router';
import { OmittedRecordRequest, Records } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';
import MetaTags from '../MetaTags';
import VisuallyHidden from '../VisuallyHidden';
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
  onUpdateRecord: (
    records: Records,
    file: File | null,
    fileName: string,
    previewUrl: string | null,
  ) => void;
  title: string;
  isLoading?: boolean;
  recordDetails?: OmittedRecordRequest;
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

  const {
    onSubmit,
    onChange,
    onBlur,
    values,
    errors,
    file,
    fileName,
    previewUrl,
  } = useFormValidation({
    initialState,
    callback: handleSubmit,
    validate,
    isLoading,
  });

  function validate() {
    return validateUpdate(values, language);
  }

  function handleSubmit() {
    onUpdateRecord(values as Records, file, fileName, previewUrl);
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
            ariaLabel={isLoading ? 'Loading' : undefined}
            isLoading={isLoading}
            className="create-update-form"
          >
            <div className="grid three-col">
              <fieldset className="flex column">
                <VisuallyHidden as="legend">
                  {language.albumInfo}
                </VisuallyHidden>
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
              </fieldset>

              <fieldset className="flex column">
                <VisuallyHidden as="legend">
                  {language.additionalInfo}
                </VisuallyHidden>
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
              </fieldset>

              <fieldset className="flex column">
                <VisuallyHidden as="legend">{language.cover}</VisuallyHidden>
                <FileInput
                  onChange={onChange}
                  name="cover"
                  id="cover"
                  labelText={language.upLoadCover}
                  value=""
                />
                <RecordImg
                  src={recordDetails?.cover || 'default.png'}
                  previewUrl={previewUrl || null}
                  title={file?.name || 'Preview'}
                  alt=""
                />
              </fieldset>
            </div>
          </Form>
        )}
      </section>
    </>
  );
};

export default CreateOrUpdateForm;
