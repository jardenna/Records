import { FC } from 'react';
import { Outlet } from 'react-router';
import Figure from '../../../components/figure/Figure';
import NavItemList from '../../../layout/nav/NavItemList';
import { authItemsList } from '../../../layout/nav/navList';
import useLanguage from '../../language/useLanguage';

const AuthLayout: FC = () => {
  const { language } = useLanguage();

  return (
    <article className="auth">
      <Figure src="/images/login_img.jpg" alt={language.authImgAlt} />
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
