import React from 'react';
import { useSelector } from 'react-redux';
import { selectDuration, selectToasts, Toast } from '../../features/toastSlice';
import ToastComponent from './ToastComponent';

const ToastList: React.FC = () => {
  const toasts = useSelector(selectToasts);
  const autoHideDuration = useSelector(selectDuration);

  return (
    <div className="toast-container">
      {toasts.map((toast: Toast) => (
        <ToastComponent
          key={toast.id}
          toast={toast}
          autoHideDuration={autoHideDuration}
        />
      ))}
    </div>
  );
};

export default ToastList;
