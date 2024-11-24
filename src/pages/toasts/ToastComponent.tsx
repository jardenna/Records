import React from 'react';
import { Toast } from '../../features/toastSlice';
import useToast from './useToast';

interface ToastProps {
  toast: Toast;
}

const ToastComponent: React.FC<ToastProps> = ({ toast }) => {
  const { deleteToast, popupClass } = useToast(toast.id);

  return (
    <div
      className={`toast animate-${toast.position || 'top-right'} ${popupClass}`}
    >
      <p>{toast.message}</p>

      <button type="button" onClick={deleteToast}>
        Close
      </button>
    </div>
  );
};

export default ToastComponent;
