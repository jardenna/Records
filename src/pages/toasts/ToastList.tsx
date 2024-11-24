import React from 'react';
import { useSelector } from 'react-redux';
import Portal from '../../components/Portal';
import { selectDuration, selectToasts, Toast } from '../../features/toastSlice';
import ToastComponent from './ToastComponent';

const ToastList: React.FC = () => {
  const toasts = useSelector(selectToasts);
  const autoHideDuration = useSelector(selectDuration);

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
