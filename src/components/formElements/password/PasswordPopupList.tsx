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
    <div className="popup-item-list">
      <ul className="test">
        {passwordRules(inputValue).map((rule) => (
          <PasswordPopupItem
            key={rule.text}
            isValid={rule.isValid}
            text={language[rule.text]}
          />
        ))}
      </ul>
    </div>
  );
};

export default PasswordPopupList;
