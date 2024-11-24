import { FC } from 'react';
import ToastItem from './ToastItem';
import useToast from './useToast';

interface ToastProps {}

const Toast: FC<ToastProps> = () => {
  const { deleteToast, toasts } = useToast();

  const handleDismissToast = (id: string) => {
    deleteToast({
      toastId: id,
    });
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
