import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Nav from './nav/Nav';

const Layout: FC = () => (
  <div className="main-container">
    <Header />
    <Nav />
    <main>
      <Outlet />
    </main>
    <footer className="main-footer" aria-label="main">
      footer
    </footer>
  </div>
);

export default Layout;
