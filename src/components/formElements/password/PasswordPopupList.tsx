import { FC } from 'react';
import useLanguage from '../../../features/language/useLanguage';
import { isNumber, isSymbol, lowercase, uppercase } from '../../../utils/regex';

interface PasswordPopupListProps {
  inputValue: string;
}

const PasswordPopupList: FC<PasswordPopupListProps> = ({ inputValue }) => {
  const { language } = useLanguage();
  const passwordRules = [
    { text: 'minLength', isValid: inputValue.length >= 8 },
    { text: 'mustHaveNumber', isValid: isNumber.test(inputValue) },
    { text: 'mustHaveLowercase', isValid: lowercase.test(inputValue) },
    { text: 'mustHaveUppercase', isValid: uppercase.test(inputValue) },
    { text: 'mustHaveSymbol', isValid: isSymbol.test(inputValue) },
  ];

  return (
    <article>
      <ul className="popup-item-list">
        {passwordRules.map(({ text, isValid }, index) => (
          <li key={index} className={`popup-item ${!isValid ? 'error' : ''}`}>
            {language[text]}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default PasswordPopupList;
