import React from 'react';
import Portal from '../../components/Portal';
import { Toast } from '../../features/toastSlice';
import ToastComponent from './ToastComponent';
import useToast from './useToast';

const ToastList: React.FC = () => {
  const { toasts, autoHideDuration } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <Portal portalId="toast">
      <div className="toast-container">
        {toasts.map((toast: Toast) => (
          <ToastComponent
            key={toast.id}
            toast={toast}
            autoHideDuration={autoHideDuration}
          />
        ))}
      </div>
    </Portal>
  );
};

export default ToastList;
