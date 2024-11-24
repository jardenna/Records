import { FC } from 'react';
import { Toast, ToastTypes } from '../../features/toastSlice';
import BtnClose from '../BtnClose';
import Icon, { IconName } from '../icons/Icon';

interface ToastItemProps {
  onDismissToast: (id: string) => void;
  toast: Toast;
}

const ToastItem: FC<ToastItemProps> = ({ toast, onDismissToast }) => {
  const toastTypeConfig: Record<
    ToastTypes,
    { iconName: IconName; title: string }
  > = {
    success: { iconName: IconName.Success, title: 'Success Notification' },
    info: { iconName: IconName.Info, title: 'Information Notification' },
    warning: { iconName: IconName.Warning, title: 'Warning Notification' },
    error: { iconName: IconName.Error, title: 'Error Notification' },
  };

  const { iconName, title } = toastTypeConfig[toast.toastType || 'info'];

  return (
    <li className={`toast ${toast.toastType}`}>
      <span>
        <Icon name={iconName} title={title} />
      </span>
      <p className="message">{toast.message}</p>
      <BtnClose onClick={onDismissToast} />
    </li>
  );
};

export default ToastItem;
