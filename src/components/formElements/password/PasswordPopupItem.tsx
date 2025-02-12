import { FC } from 'react';
import useLanguage from '../../../features/language/useLanguage';
import Icon, { IconName } from '../../icons/Icon';

interface PasswordPopupItemProps {
  passwordErrorKey: string | null;
  text: string;
}

const PasswordPopupItem: FC<PasswordPopupItemProps> = ({
  text,
  passwordErrorKey,
}) => {
  const { language } = useLanguage();

  if (passwordErrorKey) {
    console.log(language[passwordErrorKey]);
  }

  return (
    <li className="popup-item">
      <Icon
        iconName={passwordErrorKey ? IconName.Success : IconName.Error}
        title="Success"
      />
      {text}
    </li>
  );
};
export default PasswordPopupItem;
