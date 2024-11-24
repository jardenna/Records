import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  ToastTypes,
  adToast,
  dismissToast,
  selectDuration,
  selectToasts,
} from '../../features/toastSlice';

type AdToastParams = {
  message: string;
  toastType: ToastTypes;
  duration?: number; // Optional auto-dismiss duration
};

const useToast = (toastIdNew?: any) => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const toasts = useAppSelector(selectToasts);
  const autoHideDuration = useAppSelector(selectDuration);

  const handleAdToast = ({ message, toastType }: AdToastParams) => {
    dispatch(
      adToast({
        message,
        toastType,
      }),
    );
  };

  const handleDeleteToast = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    // Auto-dismiss the toast after the specified duration
    const timer = setTimeout(() => setIsVisible(false), autoHideDuration);
    return () => clearTimeout(timer);
  }, [autoHideDuration]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!isVisible) {
      // Dispatch the removal action after the dismissal animation completes
      const timer = setTimeout(() => dispatch(dismissToast(toastIdNew)), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch, toastIdNew]);

  const popupClass = isVisible ? 'is-visible' : 'dismissed';

  return {
    adToast: handleAdToast,
    deleteToast: handleDeleteToast,
    toasts,
    autoHideDuration,
    popupClass,
  };
};

export default useToast;
