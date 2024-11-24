/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { dismissToast, Toast } from '../../features/toastSlice';

interface ToastProps {
  toast: Toast;
  autoHideDuration?: number;
}

const ToastComponent: React.FC<ToastProps> = ({
  toast,
  autoHideDuration = 5000,
}) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss the toast after the specified duration
    const timer = setTimeout(() => setIsVisible(false), autoHideDuration);

    return () => clearTimeout(timer);
  }, [autoHideDuration]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (!isVisible) {
      // Dispatch the removal action after the dismissal animation completes
      const animationDuration = 500; // Match this to your animation's duration
      const timer = setTimeout(
        () => dispatch(dismissToast(toast.id)),
        animationDuration,
      );
      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch, toast.id]);

  return (
    <div
      className={`toast animate-${toast.position || 'top-right'} ${
        isVisible ? 'is-visible' : 'dismissed'
      }`}
    >
      <p>{toast.message}</p>

      <button type="button" onClick={handleDismiss}>
        Close
      </button>
    </div>
  );
};

export default ToastComponent;
