import { FC } from 'react';
import { Link } from 'react-router';
import SelectBox from '../../components/selectBox/SelectBox';
import { SelectedLanguage } from '../../features/language/languageSlice';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../LayoutElement';
import { MainPath } from '../nav/enums';
import Nav from '../nav/Nav';
import './_header.scss';

interface HeaderProps {
  ariaLabel: string;
}
const Header: FC<HeaderProps> = ({ ariaLabel }) => {
  const { switchLanguage, selectedLanguage } = useLanguage();

  const handleLanguageChange = (selectedLanguage: SelectedLanguage) => {
    switchLanguage(selectedLanguage);
  };

  return (
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
              name="language"
              options={[
                { value: 'da', label: 'DK' },
                { value: 'en', label: 'UK' },
              ]}
              id="language"
              onChange={(selectedOptions: any) =>
                handleLanguageChange(selectedOptions?.value)
              }
              labelText="selectLanguage"
              inputHasNoLabel
              defaultValue={{ value: selectedLanguage, label: 'DK' }}
            />
          </form>
        </div>
      </section>
      <Nav />
    </LayoutElement>
  );
};
export default Header;
