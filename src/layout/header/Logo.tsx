import { FC } from 'react';
import { Link } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../nav/enums';

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  const { language } = useLanguage();

  return (
    <div className="logo">
      <Link to={MainPath.Root}>
        <span>{language.plade}</span>
        <span className="logo-item">{language.collection}</span>
      </Link>
    </div>
  );
};

export default Logo;
