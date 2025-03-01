import { FC } from 'react';
import { Link } from 'react-router';
import SelectBox from '../../components/selectBox/SelectBox';
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
          <Link to={MainPath.Root}>
            <span>Plade</span>
            <span className="logo-item">samling</span>
          </Link>
        </div>
        <form>
          <SelectBox
            name="limit"
            options={[
              { value: 'da', label: 'DK' },
              { value: 'en', label: 'UK' },
            ]}
            id="limit"
            onChange={() => console.log(12)}
            labelText="language"
            inputHasNoLabel
            defaultValue={{ value: 'da', label: 'DK' }}
          />
        </form>
      </div>
    </section>
    <Nav />
  </LayoutElement>
);

export default Header;
