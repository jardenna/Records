import { FC } from 'react';
import LanguageSelect from '../../components/LanguageSelect';
import { Option, SelectedOption } from '../../components/selectBox/SelectBox';
import LayoutElement from '../LayoutElement';
import Nav from '../nav/Nav';
import './_header.scss';
import Logo from './Logo';

export interface HeaderProps {
  ariaLabel: string;
  defaultValue: Option;
  labelText: string;
  onLanguageChange: (selectedLanguage: SelectedOption) => void;
  options: { label: string; value: string | number }[];
}
const Header: FC<HeaderProps> = ({
  ariaLabel,
  onLanguageChange,
  defaultValue,
  options,
  labelText,
}) => (
  <LayoutElement as="header" className="main-header" ariaLabel={ariaLabel}>
    <section className="hero">
      <div className="container">
        <Logo />
        <LanguageSelect
          options={options}
          onLanguageChange={onLanguageChange}
          labelText={labelText}
          defaultValue={defaultValue}
        />
      </div>
    </section>
    <Nav />
  </LayoutElement>
);
export default Header;
