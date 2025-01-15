import { FC } from 'react';

export interface SkeletonListProps {
  count: number;
  height: number;
  width: number;
}

const SkeletonList: FC<SkeletonListProps> = ({ count, width, height }) => (
  <span className="skeleton-list">
    <span
      style={{ height: `${height}rem`, width: `${width}rem` }}
      className="skeleton"
    />
    <span
      style={{ height: `${height}rem`, width: `${width}rem` }}
      className="skeleton"
    />
  </span>
);

export default SkeletonList;
