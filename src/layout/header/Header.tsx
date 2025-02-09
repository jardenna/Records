import { FC } from 'react';
import { Link } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../LayoutElement';
import { MainPath } from '../nav/enums';
import MainNav from '../nav/MainNav';
import './_header.scss';

const Header: FC = () => {
  const { language } = useLanguage();

  return (
    <LayoutElement
      as="header"
      className="main-header"
      ariaLabel={language.main}
    >
      <article className="hero">
        <div className="container">
          <div className="logo">
            <Link to={MainPath.Root} className="logo-container">
              <span>Plade</span>
              <span className="logo-item">samling</span>
            </Link>
          </div>
        </div>
      </article>
      <MainNav />
    </LayoutElement>
  );
};

export default Header;
