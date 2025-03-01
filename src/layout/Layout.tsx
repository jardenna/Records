import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router';
import { SelectedOption } from '../components/selectBox/SelectBox';
import SkipLink from '../components/skipLinks/SkipLinks';
import useLanguage from '../features/language/useLanguage';
import Header from './header/Header';

export interface LayoutElementProps {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}

const Layout: FC = () => {
  const { language } = useLanguage();
  const { switchLanguage, selectedLanguage } = useLanguage();

  const handleLanguageChange = (selectedLanguage: any) => {
    switchLanguage(selectedLanguage);
  };

  return (
    <div className="main-container">
      <SkipLink />
      <Header
        labelText={language.selectLanguage}
        ariaLabel={language.main}
        onLanguageChange={(selectedLanguage: SelectedOption) =>
          handleLanguageChange(selectedLanguage)
        }
        defaultValue={{ value: selectedLanguage, label: 'DK' }}
        options={[
          { value: 'da', label: 'DK' },
          { value: 'en', label: 'UK' },
        ]}
      />
      <main id="main">
        <div className="container page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
