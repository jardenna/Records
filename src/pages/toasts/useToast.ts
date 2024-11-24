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

type DeleteToastParams = {
  toastId: string;
};

const useToast = () => {
  const dispatch = useAppDispatch();

  const handleAdToast = ({ message, toastType }: AdToastParams) => {
    dispatch(
      adToast({
        message,
        toastType,
      }),
    );
  };

  const handleDeleteToast = ({ toastId }: DeleteToastParams) => {
    dispatch(dismissToast(toastId));
  };

  const toasts = useAppSelector(selectToasts);
  const autoHideDuration = useAppSelector(selectDuration);

  return {
    adToast: handleAdToast,
    deleteToast: handleDeleteToast,
    toasts,
    autoHideDuration,
  };
};

export default useToast;
