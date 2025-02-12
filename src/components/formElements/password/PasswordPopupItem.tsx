import { FC } from 'react';
import Icon, { IconName } from '../../icons/Icon';
import VisuallyHidden from '../../VisuallyHidden';

interface PasswordPopupItemProps {
  isValid: boolean;
  text: string;
}

const PasswordPopupItem: FC<PasswordPopupItemProps> = ({ text, isValid }) => (
  <li className={`popup-item ${!isValid ? 'error' : ''}`}>
    <Icon
      iconName={isValid ? IconName.Success : IconName.Error}
      title={isValid ? 'Success' : 'Error'}
    />
    <span>{text}</span>
    <VisuallyHidden>
      {isValid ? 'Criterion met' : 'Criterion not met'}
    </VisuallyHidden>
  </li>
);

export default PasswordPopupItem;
