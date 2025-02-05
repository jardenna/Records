import { FC } from 'react';
import { NavLink, Outlet } from 'react-router';
import Figure from '../../../components/figure/Figure';
import { MainPath } from '../../../types/enums';
import useLanguage from '../../language/useLanguage';

const AuthLayout: FC = () => {
  const { language } = useLanguage();

  return (
    <section className="auth">
      <Figure src="/images/login_img.jpg" alt={language.authImgAlt} />
      <div className="auth-container">
        <nav aria-label="auth">
          <ul className="auth-menu">
            <li>
              <NavLink to={MainPath.Login} className="nav-item">
                {language.login}
              </NavLink>
            </li>

            <li>
              <NavLink to={MainPath.Register} className="nav-item">
                {language.signup}
              </NavLink>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </section>
  );
};

export default AuthLayout;
