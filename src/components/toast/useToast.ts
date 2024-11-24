import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  ToastTypes,
  adToast,
  dismissToast,
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

  const adToastHandler = ({ message, toastType }: AdToastParams) => {
    dispatch(
      adToast({
        message,
        toastType,
      }),
    );
  };

  const deleteToastHandler = ({ toastId }: DeleteToastParams) => {
    dispatch(dismissToast(toastId));
  };

  const toasts = useAppSelector(selectToasts);

  return { adToast: adToastHandler, deleteToast: deleteToastHandler, toasts };
};

export default useToast;
