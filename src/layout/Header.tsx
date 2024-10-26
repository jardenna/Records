import { FC } from 'react';
import { Link } from 'react-router-dom';
import './_header.scss';

const Header: FC = () => (
  <header className="main-header" aria-label="main">
    <div className="container">
      <h1>
        <Link to="/">Pladesamling</Link>
      </h1>
    </div>
  </header>
);

export default Header;
