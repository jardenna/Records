import { FC, ReactNode } from 'react';
import BtnClose from '../BtnClose';
import './_panel.scss';

type Variant = 'left' | 'right' | 'top' | 'bottom';

interface PanelProps {
  children: ReactNode;
  id: string;
  isPanelHidden: boolean;
  className?: string;
  onTogglePanel?: () => void;
  variant?: Variant;
}

const Panel: FC<PanelProps> = ({
  children,
  isPanelHidden,
  onTogglePanel,
  className = '',
  id,
  variant = 'top',
}) => (
  <div
    className={`panel ${variant} ${className} ${isPanelHidden ? '' : 'is-active'}`}
    id={id}
  >
    {onTogglePanel && <BtnClose onClick={onTogglePanel} ariaLabel="Close" />}
    {children}
  </div>
);

export default Panel;
