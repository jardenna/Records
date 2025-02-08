import { FC } from 'react';
import { NavLink, useLocation } from 'react-router';
import Dropdown from '../../components/dropdown/Dropdown';
import Icon, { IconName } from '../../components/icons/Icon';
import { PrimaryActionBtnProps } from '../../components/modal/Modal';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, MainPath } from '../../types/enums';
import NavItemList from './Nav';
import { navItemsList } from './navItemsList';

const MainNav: FC = () => {
  const { currentUser, logout } = useAuth();

  const location = useLocation();

  const { language } = useLanguage();

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

  const handleLogout = async () => {
    logout();
  };

  const actionBtn: PrimaryActionBtnProps = {
    onClick: handleLogout,
    label: language.logout,
  };

  const user = currentUser?.user;

  return (
    <article className="main-nav">
      <div className="nav-container container">
        <div className="flex-1">
          <NavItemList navItemsList={navItemsList} ariaLabel={language.main} />
        </div>
        <div className="nav-title flex-1">
          <h1>{title}</h1>
        </div>
        <div className="flex-1">
          <Icon iconName={IconName.User} title={language.user} />{' '}
          {!user ? (
            <NavLink to={MainPath.Login}>{language.login}</NavLink>
          ) : (
            <Dropdown
              iconName={IconName.User}
              iconTitle={language.user}
              btnVariant={BtnVariant.Ghost}
              info="Velkommen Helle"
              actionBtn={actionBtn}
            >
              <p>{language.logout}</p>
            </Dropdown>
          )}
        </div>
      </div>
    </article>
  );
};

export default MainNav;
