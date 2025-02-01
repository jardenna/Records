import { FC } from 'react';
import AddIcon from './AddIcon';
import ArrowDownIcon from './ArrowDownIcon';
import ArrowUpIcon from './ArrowUpIcon';
import ChevronLeftIcon from './ChevronLeftIcon';
import ChevronRightIcon from './ChevronRightIcon';
import ChevronsLeftIcon from './ChevronsLeftIcon';
import ChevronsRightIcon from './ChevronsRightIcon';
import CloseIcon from './CloseIcon';
import EditIcon from './EditIcon';
import ErrorIcon from './ErrorIcon';
import EyeIcon from './EyeIcon';
import FilterIcon from './FilterIcon';
import InfoIcon from './InfoIcon';
import MoreIcon from './MoreIcon';
import SubtractIcon from './SubtractIcon';
import SuccessIcon from './SuccessIcon';
import TrashIcon from './TrashIcon';
import UndoIcon from './UndoIcon';
import UserIcon from './UserIcon';
import WarningIcon from './WarningIcon';

export interface IconDefaultProps {
  title: string;
  ariaHidden?: boolean;
  className?: string;
  size?: string;
}

interface IconProps extends IconDefaultProps {
  iconName: IconName;
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
  Edit = 'edit',
  Error = 'error',
  Eye = 'eye',
  Filter = 'filter',
  Info = 'info',
  More = 'more',
  Subtract = 'subtract',
  Success = 'success',
  Trash = 'trach',
  Undo = 'undo',
  User = 'user',
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
  edit: EditIcon,
  error: ErrorIcon,
  eye: EyeIcon,
  filter: FilterIcon,
  info: InfoIcon,
  more: MoreIcon,
  subtract: SubtractIcon,
  success: SuccessIcon,
  trach: TrashIcon,
  undo: UndoIcon,
  user: UserIcon,
  warning: WarningIcon,
};

const Icon: FC<IconProps> = ({
  iconName,
  size = '20',
  title,
  className = '',
  ariaHidden,
}) => {
  const IconComponent = iconMapping[iconName];
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
