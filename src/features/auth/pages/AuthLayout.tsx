import { FC } from 'react';
import { Outlet } from 'react-router';
import Figure from '../../../components/figure/Figure';
import LayoutElement from '../../../layout/LayoutElement';
import NavItemList from '../../../layout/nav/NavItemList';
import { authItemsList } from '../../../layout/nav/navItemsList';
import useLanguage from '../../language/useLanguage';

const AuthLayout: FC = () => {
  const { language } = useLanguage();

  return (
    <article className="auth">
      <Figure src="/images/login_img.jpg" alt={language.authImgAlt} />
      <div className="auth-container">
        <LayoutElement as="nav" ariaLabel={language.sub} className="sub-nav">
          <NavItemList navItemsList={authItemsList} />
        </LayoutElement>
        <Outlet />
      </div>
    </article>
  );
};

export default AuthLayout;
