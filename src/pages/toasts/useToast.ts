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

const useToast = (toastId?: any) => {
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
    if (isVisible) {
      // Start the auto-dismiss timer
      const timer = setTimeout(() => setIsVisible(false), autoHideDuration);
      return () => clearTimeout(timer);
    }
    // Start the removal timer after the dismissal animation completes
    const timer = setTimeout(() => dispatch(dismissToast(toastId)), 500); // Match animation duration
    return () => clearTimeout(timer);
  }, [isVisible, autoHideDuration, dispatch, toastId]);

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
