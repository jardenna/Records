import { FormValues, ValidationErrors } from '../../../hooks/useFormValidation';

import { labels } from '../../recordTable/tableHeaders';

function validateUpdate(values: FormValues) {
  const errors: ValidationErrors = {};
  const { artist, title, prodYear, released } = values;
  if (!artist) {
    errors.artist = `required${labels.artist}`;
  }
  if (!title) {
    errors.title = `required${labels.title}`;
  }
  if (!prodYear) {
    errors.prodYear = `Please enter ${labels.prodYear}`;
  }
  if (released > prodYear) {
    errors.released = `must be smaller than ${labels.prodYear}`;
  }

  return errors;
}

export default validateUpdate;
