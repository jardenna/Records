import { FC } from 'react';
import { NavLink } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { LinkText, MainPath } from './enums';

export interface MainNavItem {
  linkText: LinkText;
  path: MainPath;
}

interface NavItemProps {
  navItemsList: MainNavItem[];
}

const NavItemList: FC<NavItemProps> = ({ navItemsList }) => {
  const { language } = useLanguage();

  const localizedNavItems = navItemsList.map((item) => ({
    ...item,
    linkText: language[item.linkText] || item.linkText, // Fallback to the key if translation is missing
  }));

  return (
    <ul className="nav-container">
      {localizedNavItems.map((navItem) => (
        <li key={navItem.linkText}>
          <NavLink to={navItem.path} className="nav-item">
            {navItem.linkText}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
export default NavItemList;
