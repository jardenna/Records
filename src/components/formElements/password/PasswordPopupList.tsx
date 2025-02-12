import { FC } from 'react';
import useLanguage from '../../../features/language/useLanguage';

export interface PasswordRulesProps {
  isValid: boolean;
  text: string;
}
interface PasswordPopupListProps {
  inputValue: string;
  passwordRules: (value: string) => PasswordRulesProps[];
}

const PasswordPopupList: FC<PasswordPopupListProps> = ({
  passwordRules,
  inputValue,
}) => {
  const { language } = useLanguage();

  return (
    <article>
      <ul className="popup-item-list">
        {passwordRules(inputValue).map((rule) => (
          <li
            key={rule.text}
            className={`popup-item ${!rule.isValid ? 'error' : ''}`}
          >
            {language[rule.text]}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default PasswordPopupList;
