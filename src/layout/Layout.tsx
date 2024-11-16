import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout: FC = () => (
  <div className="main-container">
    <Header />
    <main>
      <div className="container">
        <Outlet />
      </div>
    </main>
    <footer className="main-footer" aria-label="main">
      footer
    </footer>
  </div>
);

export default Layout;
