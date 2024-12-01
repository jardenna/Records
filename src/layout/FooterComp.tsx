import { FC } from 'react';
import { LayoutElementProps } from './Layout';

const FooterComp: FC<LayoutElementProps> = ({
  children,
  ariaLabel,
  className = '',
}) => (
  <footer className={className} aria-label={ariaLabel}>
    {children}
  </footer>
);

export default FooterComp;
