import { FC } from 'react';
import Skeleton from './Skeleton';
import { SkeletonListProps } from './SkeletonList';

const SkeletonListItem: FC<SkeletonListProps> = ({ count }) => (
  <section className="skeleton-container">
    <div>
      <Skeleton className="skeleton-img" />
    </div>
    <div className="skeleton-content">
      <Skeleton className="skeleton-heading" />
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton className="skeleton-paragraph" key={index} />
      ))}
    </div>
  </section>
);

export default SkeletonListItem;
