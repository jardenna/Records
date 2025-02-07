import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import Dropdown from '../../components/dropdown/Dropdown';
import { IconName } from '../../components/icons/Icon';
import { PrimaryActionBtnProps } from '../../components/modal/Modal';
import {
  authApiSlice,
  useCheckAuthQuery,
  useLogoutMutation,
} from '../../features/auth/authApiSlice';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, MainPath } from '../../types/enums';
import NavItemList from './Nav';
import { navItemsList } from './navItemsList';

const MainNav: FC = () => {
  const [logout] = useLogoutMutation();
  const { data: user } = useCheckAuthQuery();
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

  const dispatch = useDispatch(); // Import from react-redux

  const handleLogout = async () => {
    await logout().unwrap();
    dispatch(authApiSlice.util.resetApiState()); // Clear all RTK Query cache
    navigate(MainPath.Root);
  };

  const actionBtn: PrimaryActionBtnProps = {
    onClick: handleLogout,
    label: language.logout,
  };
  console.log(user);

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
          <Dropdown
            iconName={IconName.User}
            iconTitle={language.user}
            btnVariant={BtnVariant.Ghost}
            info="Velkommen Helle"
            actionBtn={actionBtn}
          >
            <p>{language.logout}</p>
          </Dropdown>
        </div>
      </div>
    </article>
  );
};

export default MainNav;
