import { FC } from 'react';
import { IconDefaultProps } from './Icon';

const GridLargeIcon: FC<IconDefaultProps> = ({
  size,
  title,
  className,
  ariaHidden,
}) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={ariaHidden}
  >
    <title>{title}</title>

    <path d="M3 4h18" />
    <path d="M3 10h18" />
    <path d="M3 16h18" />
    <path d="M3 22h18" />
  </svg>
);

export default GridLargeIcon;
