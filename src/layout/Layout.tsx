import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router';
import usePanel from '../components/panel/usePanel';
import SkipLink from '../components/skipLinks/SkipLinks';
import Header from './header/Header';

export interface LayoutElementProps {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}

const Layout: FC = () => {
  const { isPanelHidden, onTogglePanel } = usePanel();

  return (
    <div className="main-container">
      <SkipLink />
      <Header
        onTogglePanel={onTogglePanel}
        isLeftMenuHidden={isPanelHidden}
        ariaControls="ariaControls"
      />
      <main id="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
