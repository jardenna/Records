import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

// Toast Types
export type ToastTypes = 'success' | 'info' | 'warning' | 'error';

export type ToastPosition =
  | 'top-center'
  | 'top-right'
  | 'top-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'bottom-left';

// Toast Model
export type Toast = {
  id: string;
  message: string;
  toastType: ToastTypes;
  onClose?: () => void;
  position?: ToastPosition;
};

export type ToastWithoutId = Omit<Toast, 'id'>;

// Toast State
interface ToastState {
  toasts: Toast[];
  autoHideDuration?: number;
}

const initialState: Readonly<ToastState> = {
  toasts: [],
  autoHideDuration: 5000,
};

// Slice
const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastWithoutId>) => {
      state.toasts.unshift({
        id: nanoid(),
        ...action.payload,
      });
    },
    dismissToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload,
      );
    },
    setToastDuration: (
      state,
      action: PayloadAction<ToastState['autoHideDuration']>,
    ) => {
      state.autoHideDuration = action.payload;
    },
  },
});

// Actions
export const { addToast, dismissToast } = toastSlice.actions;

// Selector
export const selectToasts = (state: RootState) => state.toast.toasts;

export const selectDuration = (state: RootState) =>
  state.toast.autoHideDuration;

// Reducer
export default toastSlice.reducer;
