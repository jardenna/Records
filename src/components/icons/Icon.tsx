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
import EyeOffIcon from './EyeOffIcon';
import FilterIcon from './FilterIcon';
import GridIcon from './GridIcon';
import GridIconSmall from './GridIconSmall';
import GridLargeIcon from './GridLargeIcon';
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
  ariaLabel?: string;
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
  EyeOff = 'eyeOff',
  Filter = 'filter',
  Grid = 'grid',
  GridLarge = 'gridLarge',
  GridSmall = 'gridSmall',
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
  eyeOff: EyeOffIcon,
  filter: FilterIcon,
  grid: GridIcon,
  gridSmall: GridIconSmall,
  gridLarge: GridLargeIcon,
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
  ariaLabel,
}) => {
  const IconComponent = iconMapping[iconName];
  return (
    <IconComponent
      size={size}
      title={title}
      className={className}
      ariaHidden={ariaHidden}
      ariaLabel={ariaLabel}
    />
  );
};

export default Icon;
