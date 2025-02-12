import { isNumber, isSymbol, lowercase, uppercase } from './regex';

const passwordPolicy = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

const validatePassword = (password: string) => {
  if (password.length < passwordPolicy.minLength) {
    return 'passwordMinLength';
  }

  if ((password.match(lowercase) || []).length < passwordPolicy.minLowercase) {
    return 'passwordLowercase';
  }

  if ((password.match(uppercase) || []).length < passwordPolicy.minUppercase) {
    return 'passwordUppercase';
  }

  if ((password.match(isNumber) || []).length < passwordPolicy.minNumbers) {
    return 'passwordNumber';
  }

  if ((password.match(isSymbol) || []).length < passwordPolicy.minSymbols) {
    return 'passwordSymbol';
  }

  return null; // Valid password
};

// eslint-disable-next-line import/prefer-default-export
export { validatePassword };
