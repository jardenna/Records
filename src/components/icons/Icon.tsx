import { FC } from 'react';

import ChevronLeft from './ChevronLeft';
import ChevronRight from './ChevronRight';
import ChevronsLeft from './ChevronsLeft';
import ChevronsRight from './ChevronsRight';
import Close from './Close';
import ErrorIcon from './ErrorIcon';
import InfoIcon from './InfoIcon';
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
  ChevronLeft = 'chevronLeft',
  ChevronRight = 'chevronRight',
  ChevronsLeft = 'chevronsLeft',
  ChevronsRight = 'chevronsRight',
  Close = 'close',
  Error = 'error',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
}
const iconMapping = {
  chevronsLeft: ChevronsLeft,
  chevronsRight: ChevronsRight,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  close: Close,
  error: ErrorIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  info: InfoIcon,
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
