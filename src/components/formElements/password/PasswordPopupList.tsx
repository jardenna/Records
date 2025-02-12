import { FC } from 'react';
import useLanguage from '../../../features/language/useLanguage';
import PasswordPopupItem from './PasswordPopupItem';

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
          <PasswordPopupItem
            isValid={rule.isValid}
            text={language[rule.text]}
          />
        ))}
      </ul>
    </article>
  );
};

export default PasswordPopupList;
