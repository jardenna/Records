import { FC } from 'react';
import BtnClose from '../../components/BtnClose';
import Icon, { IconName } from '../../components/icons/Icon';
import { Toast, ToastTypes } from '../../features/toastSlice';
import useToast from './useToast';

interface ToastListItemProps {
  toast: Toast;
}

const ToastListItem: FC<ToastListItemProps> = ({ toast }) => {
  const { deleteToast, popupClass } = useToast(toast.id);
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
    <li
      className={`toast animate-${toast.position || 'top-right'} ${popupClass}`}
    >
      <span>
        <Icon name={iconName} title={title} />
      </span>
      <p className="message">{toast.message}</p>

      <BtnClose onClick={deleteToast} />
    </li>
  );
};

export default ToastListItem;
