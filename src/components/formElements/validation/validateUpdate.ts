import { FormValues, ValidationErrors } from '../../../hooks/useFormValidation';
import { LabelKeys, ValidationMessage } from '../../../types/enums';

const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;
export const minimumYear = 1889;

function validateUpdate(values: FormValues) {
  const errors: ValidationErrors = {};
  const { artist, title, prodYear, released } = values;

  if (!artist) {
    errors.artist = `${ValidationMessage.PleaseEnter} ${LabelKeys.Artist}`;
  }
  if (!title) {
    errors.title = `${ValidationMessage.PleaseEnter} ${LabelKeys.Title}`;
  }
  if (!prodYear) {
    errors.prodYear = `${ValidationMessage.PleaseEnter} ${LabelKeys.ProdYear}`;
  } else if (
    (prodYear as number) < minimumYear ||
    (prodYear as number) > nextYear
  ) {
    errors.prodYear = `${ValidationMessage.PleaseEnter} a year before ${nextYear} and after ${minimumYear}`;
  }
  if (released !== 0 && released !== '' && released < prodYear) {
    errors.released = `${ValidationMessage.MustBeGreaterEqual} ${LabelKeys.ProdYear}`;
  } else if (
    released !== 0 &&
    released !== '' &&
    (released as number) < minimumYear
  ) {
    errors.released = `${ValidationMessage.PleaseEnter} ${ValidationMessage.YearAfter} ${minimumYear}`;
  }

  return errors;
}

export default validateUpdate;
