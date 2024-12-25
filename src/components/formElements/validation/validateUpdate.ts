import { FormValues, ValidationErrors } from '../../../hooks/useFormValidation';
import { labels } from '../../recordTable/tableHeaders';

const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;
export const minimumYear = 1889;

function validateUpdate(values: FormValues) {
  const errors: ValidationErrors = {};
  const { artist, title, prodYear, released } = values;

  if (!artist) {
    errors.artist = `Please enter ${labels.artist}`;
  }
  if (!title) {
    errors.title = `Please enter ${labels.title}`;
  }
  if (!prodYear) {
    errors.prodYear = `Please enter ${labels.prodYear}`;
  } else if (
    (prodYear as number) < minimumYear ||
    (prodYear as number) > nextYear
  ) {
    errors.prodYear = `Please enter a year before ${nextYear} and after ${minimumYear}`;
  }
  if (released.toString().trim() !== '' && released < prodYear) {
    errors.released = `Must be greater than or equal to  ${labels.prodYear}`;
  } else if (
    released.toString().trim() !== '' &&
    (released as number) < minimumYear
  ) {
    errors.released = `Please enter a year after ${minimumYear}`;
  }

  return errors;
}

export default validateUpdate;
