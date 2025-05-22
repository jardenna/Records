import { FC } from 'react';
import { useLocation } from 'react-router';
import AdaptivePanel from '../../components/adaptivePanel/AdaptivePanel';
import Button from '../../components/Button';
import Icon, { IconName } from '../../components/icons/Icon';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import useWindowDimensions from '../../hooks/useWindowDimensions ';
import { MainPath } from './enums';
import NavAuthContainer from './navAuthContainer/NavAuthContainer';
import NavItemList from './NavItemList';
import { navList } from './navList';

export interface ActionBtnProps {
  ariaLabel?: string;
  className?: string;
  label?: string;
  onClick?: () => void;
}

const Nav: FC = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const { currentUser, logout } = useAuth();
  const { isMobileSize, height } = useWindowDimensions();

  const getTitle = (pathname: string): string => {
    if (pathname === `/${MainPath.Records}`) {
      return language.albums;
    }
    if (pathname === `/${MainPath.Create}`) {
      return language.createAlbum;
    }
    if (pathname.includes(`/${MainPath.Details}`)) {
      return language.details;
    }
    if (pathname.includes(`/${MainPath.Update}`)) {
      return language.updateAlbum;
    }
    if (pathname === `/${MainPath.Root}`) {
      return language.home;
    }
    if (pathname === `/${MainPath.Login}`) {
      return language.login;
    }
    return '';
  };

  const title = getTitle(location.pathname);

  const logoutActionBtn: ActionBtnProps = {
    onClick: logout,
    label: language.logout,
    className: 'user-btn',
  };

  const actionBtn: ActionBtnProps = {
    ariaLabel: language.menu,
    className: 'menu-burger',
  };

  const user = currentUser?.user;

  const triggerContent = (
    <>
      <Icon iconName={IconName.User} title={language.user} ariaHidden />
      {user ? `${language.welcome} ${user.username}` : language.login}
    </>
  );

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <section className="main-nav">
      <div className="nav-container container">
        {isMobileSize ? (
          <AdaptivePanel
            triggerContent={
              <span className="menu-burger-item" aria-hidden="true" />
            }
            actionBtn={actionBtn}
            isPanel
            panelVariant="left"
          >
            <div className="panel-nav" style={{ height: height - 100 }}>
              <NavItemList navItemsList={navList} ariaLabel={language.main} />
              <div className="flex">
                <div className="user-info">
                  <Icon
                    iconName={IconName.User}
                    title={language.user}
                    ariaHidden
                  />
                  {language.welcome} {user.username}
                </div>
                <Button type="button" onClick={handleLogout}>
                  {language.logout}
                </Button>
              </div>
            </div>
          </AdaptivePanel>
        ) : (
          <NavItemList navItemsList={navList} ariaLabel={language.main} />
        )}

        <div className="nav-title">
          <h1>{title}</h1>
        </div>
        {!isMobileSize && (
          <NavAuthContainer
            triggerContent={triggerContent}
            dropdownContent={language.logout}
            actionBtn={logoutActionBtn}
            user={user}
          />
        )}
      </div>
    </section>
  );
};

export default Nav;
