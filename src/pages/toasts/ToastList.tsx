import React from 'react';
import Portal from '../../components/Portal';
import { Toast } from '../../features/toastSlice';
import ToastListItem from './ToastListItem';
import useToast from './useToast';

const ToastList: React.FC = () => {
  const { toasts } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <Portal portalId="toast">
      <ul className="toast-container">
        {toasts.map((toast: Toast) => (
          <ToastListItem key={toast.id} toast={toast} />
        ))}
      </ul>
    </Portal>
  );
};

export default ToastList;
