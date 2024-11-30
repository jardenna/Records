import { FC, ReactNode } from 'react';

export interface HeaderCompProps {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}

const HeaderComp: FC<HeaderCompProps> = ({
  children,
  ariaLabel,
  className = '',
}) => (
  <header className={className} aria-label={ariaLabel}>
    {children}
  </header>
);

export default HeaderComp;
