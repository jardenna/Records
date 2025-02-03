import { FC, ReactNode } from 'react';
import BtnClose from '../BtnClose';
import './_panel.scss';

type Variant = 'left' | 'right' | 'top' | 'bottom';

interface PanelProps {
  children: ReactNode;
  id: string;
  isPanelHidden: boolean;
  className?: string;
  onClick?: () => void;
  variant?: Variant;
}

const Panel: FC<PanelProps> = ({
  children,
  isPanelHidden,
  onClick,
  className = '',
  id,
  variant = 'right',
}) => (
  <div
    className={`panel ${variant} ${className} ${isPanelHidden ? '' : 'is-active'}`}
    id={id}
  >
    {onClick && <BtnClose onClick={onClick} ariaLabel="Close" />}
    {children}
  </div>
);

export default Panel;
