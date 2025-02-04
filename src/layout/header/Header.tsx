import { FC } from 'react';
import { Link } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../types/enums';
import LayoutElement from '../LayoutElement';
import Nav from '../nav/Nav';
import './_header.scss';

export interface HeaderProps {
  ariaControls: string;
  isLeftMenuHidden: boolean;
  onTogglePanel: () => void;
}

const Header: FC<HeaderProps> = ({
  isLeftMenuHidden,
  onTogglePanel,
  ariaControls,
}) => {
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
      <Nav
        onTogglePanel={onTogglePanel}
        isLeftMenuHidden={isLeftMenuHidden}
        ariaControls={ariaControls}
      />
    </LayoutElement>
  );
};

export default Header;
