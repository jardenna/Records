import { FC } from 'react';
import AddIcon from './AddIcon';
import ArrowDownIcon from './ArrowDownIcon';
import ArrowUpIcon from './ArrowUpIcon';
import ChevronLeftIcon from './ChevronLeftIcon';
import ChevronRightIcon from './ChevronRightIcon';
import ChevronsLeftIcon from './ChevronsLeftIcon';
import ChevronsRightIcon from './ChevronsRightIcon';
import CloseIcon from './CloseIcon';
import ErrorIcon from './ErrorIcon';
import FilterIcon from './FilterIcon';
import InfoIcon from './InfoIcon';
import SubtractIcon from './SubtractIcon';
import SuccessIcon from './SuccessIcon';
import UndoIcon from './UndoIcon';
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
  Filter = 'filter',
  Info = 'info',
  Subtract = 'subtract',
  Success = 'success',
  Undo = 'undo',
  Warning = 'warning',
}

const iconMapping = {
  add: AddIcon,
  arrowDown: ArrowDownIcon,
  arrowUp: ArrowUpIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  chevronsLeft: ChevronsLeftIcon,
  chevronsRight: ChevronsRightIcon,
  close: CloseIcon,
  error: ErrorIcon,
  filter: FilterIcon,
  info: InfoIcon,
  subtract: SubtractIcon,
  success: SuccessIcon,
  undo: UndoIcon,
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
