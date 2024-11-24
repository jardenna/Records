import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface ModalState {
  modalId: string | null;
}

const initialState: ModalState = {
  modalId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.modalId = action.payload; // Set the modal ID to open
    },
    closeModal: (state) => {
      state.modalId = null; // Close any open modal
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModalId = (state: RootState) => state.modal.modalId;
export default modalSlice.reducer;
