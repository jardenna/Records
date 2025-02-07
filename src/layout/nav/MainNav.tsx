import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Dropdown from '../../components/dropdown/Dropdown';
import { IconName } from '../../components/icons/Icon';
import { useLogoutMutation } from '../../features/auth/authApiSlice';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, MainPath } from '../../types/enums';
import NavItemList from './Nav';
import { navItemsList } from './navItemsList';

const MainNav: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    navigate(MainPath.Root);
  };

  return (
    <article className="nav">
      <div className="nav-container container">
        <NavItemList navItemsList={navItemsList} ariaLabel={language.main} />
        <h1>{title}</h1>
        <Dropdown
          iconName={IconName.User}
          iconTitle={language.user}
          btnVariant={BtnVariant.Ghost}
          onClick={handleLogout}
          btnLabel={language.logout}
          info="Velkommen Helle"
        />
      </div>
    </article>
  );
};

export default MainNav;
