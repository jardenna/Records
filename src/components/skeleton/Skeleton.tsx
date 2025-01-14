import { FC } from 'react';
import './_skeleton.scss';

interface SkeletonProps {
  className?: string;
  count?: number;
  height?: number;
  width?: number;
}

const Skeleton: FC<SkeletonProps> = ({
  className = '',
  height = 2,
  width = 4,
  count,
}) => (
  <div className="flex column">
    {!count ? (
      <span
        style={{ height: `${height}rem`, width: `${width}rem` }}
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
    )}
  </div>
);

export default Skeleton;
