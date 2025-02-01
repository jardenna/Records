import { FC } from 'react';
import { NavLink, useLocation } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../types/enums';
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
    return '';
  };

  const title = getTitle(location.pathname);

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
      </div>
    </nav>
  );
};

export default Nav;
