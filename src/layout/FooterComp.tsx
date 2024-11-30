import { FC } from 'react';
import { HeaderCompProps } from './header/HeaderComp';

const FooterComp: FC<HeaderCompProps> = ({
  children,
  ariaLabel,
  className = '',
}) => (
  <footer className={className} aria-label={ariaLabel}>
    {children}
  </footer>
);

export default FooterComp;
