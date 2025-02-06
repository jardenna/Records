import { FC, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import Button from '../../components/Button';
import IconContent from '../../components/IconContent';
import { IconName } from '../../components/icons/Icon';
import { useLogoutMutation } from '../../features/auth/authApiSlice';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, MainPath } from '../../types/enums';
import './_nav.scss';

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
  const [isDropdownOpen, setIssDropdownOpen] = useState(false);
  return (
    <nav className="main-nav" aria-label={language.main}>
      <div className="container">
        <h1>{title}</h1>
        <ul className="main-nav-container">
          <li className="main-nav-items">
            <NavLink to={MainPath.Root}>{language.home}</NavLink>
          </li>
          <li className="main-nav-items">
            <NavLink to={MainPath.Records}>{language.albums}</NavLink>
          </li>
          <li className="main-nav-items">
            <NavLink to={MainPath.Create}>{language.createAlbum}</NavLink>
          </li>
        </ul>
        <div className="test">
          <Button
            variant={BtnVariant.Ghost}
            onClick={() => setIssDropdownOpen(!isDropdownOpen)}
          >
            <IconContent iconName={IconName.User} title={language.user} />{' '}
            <span>Velkommen Helle</span>
          </Button>
          {isDropdownOpen && (
            <Button onClick={handleLogout} className="dropdown">
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
