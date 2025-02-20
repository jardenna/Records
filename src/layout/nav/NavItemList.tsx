import { FC } from 'react';
import Button from '../../components/Button';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../LayoutElement';
import { LinkText, MainPath } from './enums';
import NavItem from './NavItem';

export interface NavItemsProps {
  linkText: LinkText;
  path: MainPath;
}

interface NavItemListProps {
  ariaLabel: string;
  navItemsList: NavItemsProps[];
  className?: string;
  logoutActionBtn?: any;
  logoutActionBtnLabel?: string;
  username?: string;
}

const NavItemList: FC<NavItemListProps> = ({
  navItemsList,
  ariaLabel,
  className = '',
  username,
  logoutActionBtn,
  logoutActionBtnLabel,
}) => {
  const { language } = useLanguage();

  const localizedNavItems = navItemsList.map((item) => ({
    ...item,
    linkText: (language[item.linkText] as LinkText) || item.linkText, // Fallback to the key if translation is missing
  }));

  return (
    <LayoutElement as="nav" ariaLabel={ariaLabel} className={className}>
      <ul className="nav-list">
        {localizedNavItems.map((navItem) => (
          <NavItem key={navItem.linkText} navItem={navItem} />
        ))}
      </ul>
      Welcome {username}
      {logoutActionBtn && (
        <Button onClick={logoutActionBtn}>{logoutActionBtnLabel}</Button>
      )}
    </LayoutElement>
  );
};

export default NavItemList;
