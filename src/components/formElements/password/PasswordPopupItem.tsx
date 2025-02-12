import { FC } from 'react';
import Icon, { IconName } from '../../icons/Icon';

interface PasswordPopupItemProps {
  isSuccess: any;
  text: string;
}

const PasswordPopupItem: FC<PasswordPopupItemProps> = ({ text, isSuccess }) => {
  console.log(isSuccess);

  return (
    <li className="popup-item">
      <Icon
        iconName={isSuccess ? IconName.Success : IconName.Error}
        title="Success"
      />
      {text}
    </li>
  );
};

export default PasswordPopupItem;
