import { FC } from 'react';
import { Outlet } from 'react-router';
import Figure from '../../../components/figure/Figure';
import useWindowDimensions from '../../../hooks/useWindowDimensions ';
import NavItemList from '../../../layout/nav/NavItemList';
import { authItemsList } from '../../../layout/nav/navList';
import useLanguage from '../../language/useLanguage';

const AuthLayout: FC = () => {
  const { language } = useLanguage();
  const { isMobileSize } = useWindowDimensions();

  return (
    <article className="auth">
      {!isMobileSize && (
        <Figure src="/images/login_img.jpg" alt={language.authImgAlt} />
      )}
      <div className="auth-container">
        <NavItemList
          navItemsList={authItemsList}
          ariaLabel={language.sub}
          className="sub-nav"
        />
        <Outlet />
      </div>
    </article>
  );
};

export default AuthLayout;
