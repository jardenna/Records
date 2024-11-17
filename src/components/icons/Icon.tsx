import { FC } from 'react';

import ChevronLeft from './ChevronLeft';
import ChevronRight from './ChevronRight';
import ChevronsLeft from './ChevronsLeft';
import ChevronsRight from './ChevronsRight';
import Close from './Close';

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
}
const iconMapping = {
  chevronsLeft: ChevronsLeft,
  chevronsRight: ChevronsRight,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  close: Close,
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
