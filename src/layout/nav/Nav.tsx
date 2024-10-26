import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { MainPath } from '../../types/enums';

interface NavProps {}

const Nav: FC<NavProps> = () => (
  <nav>
    <ul>
      <li>
        <NavLink to={MainPath.Records}>Records</NavLink>
      </li>
      <li>
        <NavLink to={MainPath.Details}>Details</NavLink>
      </li>
      <li>
        <NavLink to={MainPath.Update}>Update</NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
