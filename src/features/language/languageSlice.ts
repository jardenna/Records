import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import danishLang from '../../../da.json';
import { RootState } from '../../app/store';

export type SelectedLanguage = 'en' | 'da';

interface LanguageState {
  language: Record<string, string>;
  selectedLanguage: SelectedLanguage;
}

// Asynchronous thunk for loading language JSON file depending on selected language
export const loadLanguage = createAsyncThunk<
  Record<string, string>,
  SelectedLanguage
>('language/loadLanguage', async (lang: SelectedLanguage) => {
  const languages = await import(`../../locales/${lang}.json`);
  return languages.default;
});

// Initial state
const initialState: LanguageState = {
  selectedLanguage: 'en', // default language
  language: danishLang,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<SelectedLanguage>) => {
      state.selectedLanguage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadLanguage.fulfilled,
      (state, action: PayloadAction<Record<string, string>>) => {
        state.language = action.payload;
      },
    );
  },
});

export const { setLanguage } = languageSlice.actions;
export const selectLanguage = (state: RootState) => state.language.language;
export const selectSelectedLanguage = (state: RootState) =>
  state.language.selectedLanguage;

export default languageSlice.reducer;
