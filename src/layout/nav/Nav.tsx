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
      return 'Records';
    }
    if (pathname === `/${MainPath.Create}`) {
      return 'Create album';
    }
    if (pathname.includes(`/${MainPath.Details}`)) {
      return 'Details';
    }
    if (pathname.includes(`/${MainPath.Update}`)) {
      return 'Update album';
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
            <NavLink to={MainPath.Records}>Records</NavLink>
          </li>
          <li className="main-nav-items">
            <NavLink to={MainPath.Create}>Create album</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
