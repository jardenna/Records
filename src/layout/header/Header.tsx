import { FC } from 'react';
import { Link } from 'react-router';
import LayoutElement from '../LayoutElement';
import { MainPath } from '../nav/enums';
import Nav from '../nav/Nav';
import './_header.scss';

interface HeaderProps {
  ariaLabel: string;
}
const Header: FC<HeaderProps> = ({ ariaLabel }) => (
  <LayoutElement as="header" className="main-header" ariaLabel={ariaLabel}>
    <section className="hero">
      <div className="container">
        <div className="logo">
          <Link to={MainPath.Root} className="logo-container">
            <span>Plade</span>
            <span className="logo-item">samling</span>
          </Link>
        </div>
      </div>
    </section>
    <Nav />
  </LayoutElement>
);

export default Header;
