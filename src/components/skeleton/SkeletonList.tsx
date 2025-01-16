import { FC } from 'react';
import Skeleton from './Skeleton';

export interface SkeletonListProps {
  className?: string;
  count?: number;
  height?: number;
  width?: number;
}

const SkeletonList: FC<SkeletonListProps> = ({
  count = 2,
  width,
  height,
  className = '',
}) => {
  const skeletons = Array.from({ length: count });
  return (
    <span className="skeleton-list">
      {skeletons.map((_, index) => (
        <Skeleton
          key={index}
          height={height}
          width={width}
          className={className}
        />
      ))}
    </span>
  );
};

export default SkeletonList;
