import { FC } from 'react';

import AddIcon from './AddIcon';
import ArrowDown from './ArrowDown';
import ArrowUp from './ArrowUp';
import ChevronLeft from './ChevronLeft';
import ChevronRight from './ChevronRight';
import ChevronsLeft from './ChevronsLeft';
import ChevronsRight from './ChevronsRight';
import Close from './Close';
import ErrorIcon from './ErrorIcon';
import InfoIcon from './InfoIcon';
import SubtractIcon from './SubtractIcon';
import SuccessIcon from './SuccessIcon';
import WarningIcon from './WarningIcon';

export interface IconDefaultProps {
  title: string;
  ariaHidden?: boolean;
  className?: string;
  size?: string;
}

interface IconProps extends IconDefaultProps {
  name: IconName;
}

export enum IconName {
  Add = 'add',
  ArrowDown = 'arrowDown',
  ArrowUp = 'arrowUp',
  ChevronLeft = 'chevronLeft',
  ChevronRight = 'chevronRight',
  ChevronsLeft = 'chevronsLeft',
  ChevronsRight = 'chevronsRight',
  Close = 'close',
  Error = 'error',
  Info = 'info',
  Subtract = 'subtract',
  Success = 'success',
  Warning = 'warning',
}

const iconMapping = {
  add: AddIcon,
  arrowDown: ArrowDown,
  arrowUp: ArrowUp,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronsLeft: ChevronsLeft,
  chevronsRight: ChevronsRight,
  close: Close,
  error: ErrorIcon,
  info: InfoIcon,
  subtract: SubtractIcon,
  success: SuccessIcon,
  warning: WarningIcon,
};

const Icon: FC<IconProps> = ({
  name,
  size = '20',
  title,
  className = '',
  ariaHidden,
}) => {
  const IconComponent = iconMapping[name];
  return (
    <IconComponent
      size={size}
      title={title}
      className={className}
      ariaHidden={ariaHidden}
    />
  );
};

export default Icon;
