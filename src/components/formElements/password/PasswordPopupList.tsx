import { FC } from 'react';
import useLanguage from '../../../features/language/useLanguage';
import Progress from '../../progress/Progress';
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
  const x = passwordRules(inputValue);

  const validCount = x.filter((item) => item.isValid).length;
  const progress = (validCount / x.length) * 100;

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
      <Progress completed={progress} />
    </div>
  );
};

export default PasswordPopupList;
