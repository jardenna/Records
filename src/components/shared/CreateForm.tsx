import { FC } from 'react';
import { OmittedRecordRequest, Records } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';
import MetaTags from '../MetaTags';
import Input from '../formElements/Input';
import Textarea from '../formElements/Textarea';
import Form from '../formElements/form/Form';
import validateUpdate, {
  minimumYear,
} from '../formElements/validation/validateUpdate';
import RecordImg from './recordImg/RecordImg';
//  onUpdateRecord?: (values: Records) => void;
interface CreateFormProps {
  title: string;
  isLoading?: boolean;
  onUpdateRecord?: any;
  recordDetails?: OmittedRecordRequest;
}

const CreateForm: FC<CreateFormProps> = ({
  recordDetails,
  onUpdateRecord,
  isLoading,
  title,
}) => {
  const { language } = useLanguage();
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
    imgUpdated,
    previewUrl,
  } = useFormValidation({
    initialState,
    callback: handleSubmit,
    validate,
  });

  function validate() {
    return validateUpdate(values, language);
  }

  function handleSubmit() {
    if (onUpdateRecord) {
      onUpdateRecord(values as Records, file, fileName, imgUpdated, previewUrl);
    }
  }
  const maxYear = new Date().getFullYear() + 1;

  return (
    <>
      <MetaTags
        description="This is the records page description"
        keywords="records, music, artists"
        title={title}
      />

      <section>
        <Form
          onSubmit={onSubmit}
          labelText={title}
          isLoading={isLoading}
          className="create-form"
        >
          <div className="grid three-col">
            <div className="flex column">
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
                value={values.released || ''}
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
            </div>

            <div className="flex column">
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
            </div>

            <div className="file-container flex column">
              <RecordImg
                src={recordDetails?.cover || 'default.png'}
                previewUrl={imgUpdated ? previewUrl : null}
                title={file?.name || null}
                alt=""
              />
              <Input
                type="file"
                onChange={onChange}
                name="cover"
                id="cover"
                labelText={language.upLoadCover}
                value=""
              />
            </div>
          </div>
        </Form>
      </section>
    </>
  );
};

export default CreateForm;
