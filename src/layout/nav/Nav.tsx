import { FC } from 'react';
import { NavLink } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../LayoutElement';
import { LinkText, MainPath } from './enums';

interface NavItemProps {
  linkText: LinkText;
  path: MainPath;
}

interface NavProps {
  ariaLabel: string;
  navItemsList: NavItemProps[];
  className?: string;
}

const Nav: FC<NavProps> = ({ navItemsList, ariaLabel, className }) => {
  const { language } = useLanguage();

  const localizedNavItems = navItemsList.map((item) => ({
    ...item,
    linkText: language[item.linkText] || item.linkText, // Fallback to the key if translation is missing
  }));

  return (
    <LayoutElement as="nav" ariaLabel={ariaLabel} className={className}>
      <ul className="nav-list">
        {localizedNavItems.map((navItem) => (
          <li key={navItem.linkText}>
            <NavLink to={navItem.path} className="nav-item">
              {navItem.linkText}
            </NavLink>
          </li>
        ))}
      </ul>
    </LayoutElement>
  );
};
export default Nav;
