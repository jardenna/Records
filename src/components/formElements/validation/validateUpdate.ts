import { FormValues, ValidationErrors } from '../../../hooks/useFormValidation';
import { ValidationMessage } from '../../../types/enums';

const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;
export const minimumYear = 1889;

function validateUpdate(values: FormValues) {
  const errors: ValidationErrors = {};
  const { artist, title, prodYear, released } = values;

  if (!artist) {
    errors.artist = ValidationMessage.PleaseEnter;
  }
  if (!title) {
    errors.title = ValidationMessage.PleaseEnter;
  }
  if (!prodYear) {
    errors.prodYear = 'Please enter Production year';
  } else if (
    (prodYear as number) < minimumYear ||
    (prodYear as number) > nextYear
  ) {
    errors.prodYear = `Please enter a year before ${nextYear} and after ${minimumYear}`;
  }
  if (released !== 0 && released !== '' && released < prodYear) {
    errors.released = `Must be greater than or equal to  Production year`;
  } else if (
    released !== 0 &&
    released !== '' &&
    (released as number) < minimumYear
  ) {
    errors.released = `Please enter a year after ${minimumYear}`;
  }
  return errors;
}

export default validateUpdate;
