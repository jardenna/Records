import { FC } from 'react';
import { Link } from 'react-router';
import { MainPath } from '../types/enums';
import Nav from './nav/Nav';

import './_header.scss';

const Header: FC = () => (
  <header className="main-header" aria-label="main">
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
  </header>
);

export default Header;
