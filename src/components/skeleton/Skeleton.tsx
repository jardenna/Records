import { FC } from 'react';
import './_skeleton.scss';

interface SkeletonProps {
  className?: string;
  count?: number;
  height?: number;
}

const Skeleton: FC<SkeletonProps> = ({ className = '', height = 10, count }) =>
  !count ? (
    <span
      style={{ height: `${height}rem` }}
      className={`skeleton ${className}`}
    />
  ) : (
    Array.from({ length: count }).map((_, index) => (
      <span
        key={index}
        style={{ height: `${height}rem` }}
        className={`skeleton ${className}`}
      />
    ))
  );

export default Skeleton;
