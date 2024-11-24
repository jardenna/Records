import { FC } from 'react';
import { ToastTypes } from '../../features/toastSlice';

interface ToastProps {}

const Toast: FC<ToastProps> = () => {
  const toastTypeConfig: Record<
    ToastTypes,
    { iconName: string; title: string }
  > = {
    success: { iconName: 'check-circle', title: 'Success Notification' },
    info: { iconName: 'info-circle', title: 'Information Notification' },
    warning: { iconName: 'exclamation-circle', title: 'Warning Notification' },
    error: { iconName: 'error-circle', title: 'Error Notification' },
  };
  return <section>aa</section>;
};

export default Toast;
