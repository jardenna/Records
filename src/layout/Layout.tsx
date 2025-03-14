import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router';
import SkipLink from '../components/skipLinks/SkipLinks';
import useLanguage, { languageOptions } from '../features/language/useLanguage';
import Header from './header/Header';

export interface LayoutElementProps {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}

const Layout: FC = () => {
  const { language, switchLanguage, selectedLanguage } = useLanguage();
  const selected = languageOptions.find(
    (option) => option.value === selectedLanguage,
  );

  return (
    <div className="main-container">
      <SkipLink />
      <Header
        labelText={language.selectLanguage}
        ariaLabel={language.main}
        onLanguageChange={switchLanguage}
        defaultValue={{
          value: selectedLanguage,
          label: selected ? selected.label : 'DK',
        }}
        options={languageOptions}
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
