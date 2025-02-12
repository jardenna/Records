import { FC } from 'react';
import Icon, { IconName } from '../../icons/Icon';

interface PasswordPopupItemProps {
  inputValue: string;
  text: string;
}

const PasswordPopupItem: FC<PasswordPopupItemProps> = ({
  text,
  inputValue,
}) => {
  console.log(inputValue);

  return (
    <li className="popup-item">
      <Icon
        iconName={inputValue ? IconName.Success : IconName.Error}
        title="Success"
      />
      {text}
    </li>
  );
};

export default PasswordPopupItem;
