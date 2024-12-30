import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  loadLanguage,
  SelectedLanguage,
  selectLanguage,
  selectSelectedLanguage,
  setLanguage,
} from './languageSlice';

const useLanguage = () => {
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector(selectSelectedLanguage);
  const language = useAppSelector(selectLanguage);

  // Load the selected language
  useEffect(() => {
    dispatch(loadLanguage(selectedLanguage));
  }, [dispatch, selectedLanguage]);

  const switchLanguage = (lang: SelectedLanguage) => {
    dispatch(setLanguage(lang));
  };

  return { switchLanguage, language, selectedLanguage };
};

export default useLanguage;
