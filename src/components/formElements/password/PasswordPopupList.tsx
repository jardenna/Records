import { FC } from 'react';
import { isNumber, isSymbol, lowercase, uppercase } from '../../../utils/regex';

interface PasswordPopupListProps {
  inputValue: string;
}

const PasswordPopupList: FC<PasswordPopupListProps> = ({ inputValue }) => {
  const passwordRules = [
    { text: 'Mindst 8 tegn', isValid: inputValue.length >= 8 },
    { text: 'Mindst ét tal', isValid: isNumber.test(inputValue) },
    { text: 'Mindst ét lille bogstav', isValid: lowercase.test(inputValue) },
    { text: 'Mindst ét stort bogstav', isValid: uppercase.test(inputValue) },
    { text: 'Mindst ét specielt tegn', isValid: isSymbol.test(inputValue) },
  ];

  return (
    <article>
      <ul className="popup-item-list">
        {passwordRules.map(({ text, isValid }, index) => (
          <li key={index} className={`popup-item ${!isValid ? 'error' : ''}`}>
            {text}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default PasswordPopupList;
