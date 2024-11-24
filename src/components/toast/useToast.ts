import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  ToastTypes,
  addToast,
  dismissToast,
  selectToasts,
} from '../../features/toastSlice';

type AdToastParams = {
  message: string;
  toastType: ToastTypes;
};

type DeleteToastParams = {
  toastId: string;
};

const useToast = () => {
  const dispatch = useAppDispatch();

  const addToastHandler = ({ message, toastType }: AdToastParams) => {
    dispatch(
      addToast({
        message,
        toastType,
      }),
    );
  };

  const deleteToastHandler = ({ toastId }: DeleteToastParams) => {
    dispatch(dismissToast(toastId));
  };

  const toasts = useAppSelector(selectToasts);

  return { addToast: addToastHandler, deleteToast: deleteToastHandler, toasts };
};

export default useToast;
