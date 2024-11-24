import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { dismissToast, selectToasts } from '../../features/toastSlice';
import ToastItem from './ToastItem';

interface ToastProps {}

const Toast: FC<ToastProps> = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(selectToasts);

  const handleDismissToast = (id: string) => {
    dispatch(dismissToast(id));
  };

  return (
    <ul>
      {toasts.map((toast) => (
        <ToastItem
          toast={toast}
          key={toast.id}
          onDismissToast={() => handleDismissToast(toast.id)}
        />
      ))}
    </ul>
  );
};

export default Toast;
