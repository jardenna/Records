import { FC } from 'react';
import { NavLink } from 'react-router';
import { MainPath } from '../../types/enums';
import './_nav.scss';

const Nav: FC = () => (
  <nav className="main-nav" aria-label="main">
    <div className="container">
      <ul className="main-nav-container">
        <li className="main-nav-items">
          <NavLink to={MainPath.Records}>Records</NavLink>
        </li>
        <li className="main-nav-items">
          <NavLink to={MainPath.Update}>Update</NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Nav;
