import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router';
import SkipLink from '../components/skipLinks/SkipLinks';
import useLanguage from '../features/language/useLanguage';
import FooterComp from './FooterComp';
import Header from './header/Header';

export interface LayoutElementProps {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}

const Layout: FC = () => {
  const { language } = useLanguage();
  return (
    <div className="main-container">
      <SkipLink />
      <Header />
      <main id="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <FooterComp className="main-footer" ariaLabel={language.main}>
        footer
      </FooterComp>
    </div>
  );
};
export default Layout;
