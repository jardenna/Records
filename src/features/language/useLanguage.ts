import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  SelectedLanguage,
  selectLanguage,
  selectSelectedLanguage,
  setLanguage,
} from './languageSlice';

const useLanguage = () => {
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector(selectSelectedLanguage);

  const [lang, setLang] = useLocalStorage('lang', selectedLanguage);
  const language = useAppSelector(selectLanguage);

  const switchLanguage = (lang: SelectedLanguage) => {
    setLang(lang);
  };

  useEffect(() => {
    dispatch(setLanguage(lang));
  }, [lang]);

  return { switchLanguage, language, selectedLanguage: lang };
};

export default useLanguage;
