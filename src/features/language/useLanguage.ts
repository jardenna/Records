import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  selectLanguage,
  selectSelectedLanguage,
  setLanguage,
} from './languageSlice';

interface Language {
  value: string;
}

const useLanguage = () => {
  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector(selectSelectedLanguage);

  const [lang, setLang] = useLocalStorage('lang', selectedLanguage);
  const language = useAppSelector(selectLanguage);

  const switchLanguage = (lang: Language) => {
    setLang(lang.value);
  };

  useEffect(() => {
    dispatch(setLanguage(lang));
  }, [lang]);

  return { switchLanguage, language, selectedLanguage: lang };
};

export default useLanguage;
