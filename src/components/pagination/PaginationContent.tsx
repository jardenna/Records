import { FC } from 'react';
import Icon, { IconName } from '../icons/Icon';
import VisuallyHidden from '../VisuallyHidden';

interface PaginationContentProps {
  iconName: IconName;
  title: string;
}

const PaginationContent: FC<PaginationContentProps> = ({ iconName, title }) => (
  <>
    <Icon name={iconName} title={title} ariaHidden />
    <VisuallyHidden>{title}</VisuallyHidden>
  </>
);

export default PaginationContent;
