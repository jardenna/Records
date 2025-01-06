import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router';
import FooterComp from './FooterComp';
import Header from './header/Header';
import useLanguage from '../features/language/useLanguage';

export interface LayoutElementProps {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}

const Layout: FC = () => {
  const { language } = useLanguage();
  return (
    <div className="main-container">
      <Header />
      <main>
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
