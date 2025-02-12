import { FC } from 'react';
import useLanguage from '../../../features/language/useLanguage';

interface PasswordPopupListProps {
  passwordRules: string[];
}

const PasswordPopupList: FC<PasswordPopupListProps> = ({ passwordRules }) => {
  const { language } = useLanguage();

  return (
    <article>
      <ul className="popup-item-list">
        {passwordRules.map((rule: any) => (
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
