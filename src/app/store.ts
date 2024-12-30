import { configureStore } from '@reduxjs/toolkit';

import messagePopupReducer from '../features/messagePopupSlice';

import languageReducer from '../features/language/languageSlice';
import modalReducer from '../features/modalSlice';
import toastReducer from '../features/toastSlice';
import apiSlice from './api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    modal: modalReducer,
    toast: toastReducer,
    messagePopup: messagePopupReducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
