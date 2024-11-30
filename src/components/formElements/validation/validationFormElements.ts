import { FormValues, ValidationErrors } from '../../../hooks/useFormValidation';
import language from '../../../language/language.json';
import { emailRegex } from '../../../utils';

function validationFormElements(values: FormValues) {
  const errors: ValidationErrors = {};
  const { phone, email, fullName } = values;

  if (!phone) {
    errors.phone = `${language.PleaseEnter} Your phone no.`;
  }

  if (!fullName) {
    errors.fullName = `${language.PleaseEnter} Your name`;
  }

  // Email Errors
  if (!email) {
    errors.email = `${language.PleaseEnter} Your email`;
  } else if (!emailRegex.test(email as string)) {
    errors.email = `${language.PleaseEnter} a valid emai`;
  }

  return errors;
}

export default validationFormElements;
