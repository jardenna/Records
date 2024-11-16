import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => (
  <div className="main-container">
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
