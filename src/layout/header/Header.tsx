import { FC } from 'react';
import LanguageSelect from '../../components/LanguageSelect';
import { Option } from '../../components/selectBox/SelectBox';
import { SelectedLanguage } from '../../features/language/languageSlice';
import LayoutElement from '../LayoutElement';
import Nav from '../nav/Nav';
import './_header.scss';
import Logo from './Logo';

interface HeaderProps {
  ariaLabel: string;
  defaultValue: Option;
  handleLanguageChange: (selectedLanguage: SelectedLanguage) => void;
  labelText: string;
  options: { label: string; value: string | number }[];
}
const Header: FC<HeaderProps> = ({
  ariaLabel,
  handleLanguageChange,
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
          onLanguageChange={(selectedOptions: any) =>
            handleLanguageChange(selectedOptions?.value)
          }
          labelText={labelText}
          defaultValue={defaultValue}
        />
      </div>
    </section>
    <Nav />
  </LayoutElement>
);
export default Header;
