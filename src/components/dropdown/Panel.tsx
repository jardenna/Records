import { FC, ReactNode } from 'react';
import BtnClose from '../BtnClose';
import './_panel.scss';

export type Variant = 'left' | 'right' | 'top' | 'bottom';

interface PanelProps {
  children: ReactNode;
  id: string;
  isPanelHidden: boolean;
  ref: React.Ref<HTMLDivElement>;
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
  variant = 'right',
  ref = null,
}) => (
  <div
    ref={ref}
    className={`panel ${variant} ${className} ${isPanelHidden ? '' : 'is-active'}`}
    id={id}
  >
    {onTogglePanel && <BtnClose onClick={onTogglePanel} ariaLabel="Close" />}
    {children}
  </div>
);

export default Panel;
