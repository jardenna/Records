import React from 'react';
import { useDispatch } from 'react-redux';
import { adToast } from '../../features/toastSlice';

const ToastButton: React.FC = () => {
  const dispatch = useDispatch();

  const showToast = () => {
    dispatch(
      adToast({
        message: 'This is a toast message!',
        toastType: 'success',
        position: 'top-right',
      }),
    );
  };

  return (
    <button type="button" onClick={showToast}>
      Show Toast
    </button>
  );
};

export default ToastButton;
