import { FC } from 'react';
import Icon, { IconName } from '../../icons/Icon';

interface PasswordPopupItemProps {
  isValid: boolean;
  text: string;
}

const PasswordPopupItem: FC<PasswordPopupItemProps> = ({ text, isValid }) => (
  <li className={`popup-item ${!isValid ? 'error' : ''}`}>
    <Icon
      iconName={isValid ? IconName.Success : IconName.Error}
      title={isValid ? 'Euccess' : 'Error'}
    />
    {text}
  </li>
);

export default PasswordPopupItem;
