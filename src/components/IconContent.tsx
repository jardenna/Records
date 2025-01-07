import { FC } from 'react';
import Icon, { IconName } from './icons/Icon';
import VisuallyHidden from './VisuallyHidden';

interface IconContentProps {
  iconName: IconName;
  title: string;
}

const IconContent: FC<IconContentProps> = ({ iconName, title }) => (
  <>
    <Icon name={iconName} title={title} ariaHidden />
    <VisuallyHidden>{title}</VisuallyHidden>
  </>
);

export default IconContent;
