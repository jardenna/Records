import { FC } from 'react';
import Skeleton from './Skeleton';

export interface SkeletonListProps {
  height: number;
  width: number;
  count?: number;
}

const SkeletonList: FC<SkeletonListProps> = ({ count = 2, width, height }) => {
  const skeletons = Array.from({ length: count });
  return (
    <span className="skeleton-list">
      {skeletons.map((_, index) => (
        <Skeleton key={index} height={height} width={width} />
      ))}
    </span>
  );
};

export default SkeletonList;
