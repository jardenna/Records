import { isNumber, isSymbol, lowercase, uppercase } from './regex';

const passwordRules = (inputValue: string) => {
  const passwordRuleas = [
    { text: 'minLength', isValid: inputValue.length >= 8 },
    { text: 'mustHaveNumber', isValid: isNumber.test(inputValue) },
    { text: 'mustHaveLowercase', isValid: lowercase.test(inputValue) },
    { text: 'mustHaveUppercase', isValid: uppercase.test(inputValue) },
    { text: 'mustHaveSymbol', isValid: isSymbol.test(inputValue) },
  ];

  return passwordRuleas;
};

export default passwordRules;
