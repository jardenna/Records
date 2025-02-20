import { FC } from 'react';
import { useLocation } from 'react-router';
import Icon, { IconName } from '../../components/icons/Icon';
import { PrimaryActionBtnProps } from '../../components/modal/Modal';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from './enums';
import NavAuthContainer from './navAuthContainer/NavAuthContainer';
import NavItemList from './NavItemList';
import { navList } from './navList';

const Nav: FC = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const { currentUser, logout } = useAuth();

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
    if (pathname === MainPath.Root) {
      return language.home;
    }
    if (pathname === `/${MainPath.Login}`) {
      return language.login;
    }
    return '';
  };

  const title = getTitle(location.pathname);

  const actionBtn: PrimaryActionBtnProps = {
    onClick: logout,
    label: language.logout,
  };

  const user = currentUser?.user;

  const triggerContent = (
    <>
      <Icon iconName={IconName.User} title="user" />
      {user ? `${language.welcome} ${user.username}` : language.login}
    </>
  );

  return (
    <article className="main-nav">
      <div className="nav-container container">
        <div className="flex-1">
          {user && (
            <NavItemList navItemsList={navList} ariaLabel={language.main} />
          )}
        </div>
        <div className="nav-title flex-1">
          <h1>{title}</h1>
        </div>
        <NavAuthContainer
          triggerContent={triggerContent}
          dropdownContent={language.logout}
          actionBtn={actionBtn}
          user={user || null}
        />
      </div>
    </article>
  );
};

export default Nav;
