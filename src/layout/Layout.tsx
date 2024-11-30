import { FC } from 'react';
import { Outlet } from 'react-router';
import FooterComp from './FooterComp';
import Header from './header/Header';

const Layout: FC = () => (
  <div className="main-container">
    <Header />
    <main>
      <div className="container">
        <Outlet />
      </div>
    </main>
    <FooterComp className="main-footer" ariaLabel="main">
      footer
    </FooterComp>
  </div>
);

export default Layout;
