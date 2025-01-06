import { FC } from 'react';
import { Link } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../types/enums';
import Nav from '../nav/Nav';
import HeaderComp from './HeaderComp';
import './_header.scss';

const Header: FC = () => {
  const { language } = useLanguage();
  return (
    <HeaderComp className="main-header" ariaLabel={language.main}>
      <article className="hero">
        <div className="container">
          <div className="logo">
            <Link to={MainPath.Root}>
              <span>Plade</span>
              <span>samling</span>
            </Link>
          </div>
        </div>
      </article>
      <Nav />
    </HeaderComp>
  );
};

export default Header;
