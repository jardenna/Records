import { FC } from 'react';
import { LayoutElementProps } from '../Layout';

const HeaderComp: FC<LayoutElementProps> = ({
  children,
  ariaLabel,
  className = '',
}) => (
  <header className={className} aria-label={ariaLabel}>
    {children}
  </header>
);

export default HeaderComp;
