import { FC } from 'react';

import ChevronsLeft, { IconDefaultProps } from './ChevronsLeft';

interface IconProps extends IconDefaultProps {
  name: IconName;
}
export enum IconName {
  ChevronsLeft = 'chevronsLeft',
}
const iconMapping = {
  chevronsLeft: ChevronsLeft,
};

const Icon: FC<IconProps> = ({ name, size = '20', title, className = '' }) => {
  const IconComponent = iconMapping[name];
  return <IconComponent size={size} title={title} className={className} />;
};

export default Icon;
