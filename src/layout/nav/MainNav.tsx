import { FC, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import Icon, { IconName } from '../../components/icons/Icon';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../types/enums';
import NavItemList from './Nav';
import { navItemsList } from './navItemsList';

const MainNav: FC = () => {
  const { currentUser } = useAuth();

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
  const navigate = useNavigate();
  const [sendLogout, { isLoading, isSuccess }] = useSendLogoutMutation();

  // const handleLogout = async () => {
  //   logout();
  // };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  if (isLoading) {
    return <p>Logging Out...</p>;
  }

  // const actionBtn: PrimaryActionBtnProps = {
  //   onClick: handleLogout,
  //   label: language.logout,
  // };

  const user = currentUser?.user;
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
          <Icon iconName={IconName.User} title={language.user} />{' '}
          {!user ? (
            <NavLink to={MainPath.Login}>{language.login}</NavLink>
          ) : (
            <button
              type="button"
              className="icon-button"
              title="Logout"
              onClick={sendLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default MainNav;
