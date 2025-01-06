import { Records } from '../../../app/api/apiTypes';
import { ValidationErrors } from '../../../hooks/useFormValidation';

const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;
export const minimumYear = 1889;
type OmittedProps = Omit<Records, 'id'>;

function validateUpdate(
  values: OmittedProps,
  language: Record<string, string>,
) {
  const errors: ValidationErrors = {};
  if (!values.artist) {
    errors.artist = `${language.pleaseEnter} ${language.artist}`;
  }
  if (!values.title) {
    errors.title = `${language.pleaseEnter} ${language.title}`;
  }

  if (!values.prodYear) {
    errors.prodYear = `${language.pleaseEnter} ${language.prodYear}`;
  } else if (
    Number(values.prodYear) < minimumYear ||
    Number(values.prodYear) > nextYear
  ) {
    errors.prodYear = `${language.pleaseEnter} ${language.yearBetween} ${minimumYear} ${language.and} ${nextYear}`;
  }

  if (
    Number(values.released) !== 0 &&
    values.released !== '' &&
    values.released < values.prodYear
  ) {
    errors.released = `${language.pleaseEnter} ${language.yearAfterOrEqual}  ${language.prodYear}`;
  } else if (
    Number(values.released) !== 0 &&
    values.released !== '' &&
    Number(values.released) < minimumYear
  ) {
    errors.released = `${language.pleaseEnter} ${language.yearAfter} ${minimumYear}`;
  }

  return errors;
}

export default validateUpdate;
