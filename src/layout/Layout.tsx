import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router';
import SkipLink from '../components/skipLinks/SkipLinks';
import Header from './header/Header';

export interface LayoutElementProps {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}

const Layout: FC = () => (
  <div className="main-container">
    <SkipLink />
    <Header />
    <main id="main">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);
export default Layout;
