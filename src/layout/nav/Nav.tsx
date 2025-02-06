import { FC } from 'react';
import { useLocation } from 'react-router';
import Dropdown from '../../components/dropdown/Dropdown';
import { IconName } from '../../components/icons/Icon';
import { useLogoutMutation } from '../../features/auth/authApiSlice';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, MainPath } from '../../types/enums';
import './_nav.scss';
import NavItemList from './NavItemList';
import { navItemsList } from './navItemsList';

const Nav: FC = () => {
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
  const [logout] = useLogoutMutation();
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="main-nav" aria-label={language.main}>
      <div className="container">
        <h1>{title}</h1>
        <NavItemList navItemsList={navItemsList} />
        <Dropdown
          iconName={IconName.User}
          iconTitle={language.user}
          btnVariant={BtnVariant.Ghost}
          onClick={handleLogout}
          btnLabel={language.logout}
          info="Velkommen Helle"
        />
      </div>
    </nav>
  );
};

export default Nav;
