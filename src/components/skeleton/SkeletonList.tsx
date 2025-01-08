import { FC } from 'react';
import SkeletonListItem from './SkeletonListItem';

export interface SkeletonListProps {
  count: number;
}

const SkeletonList: FC<SkeletonListProps> = ({ count }) => (
  <section>
    <ul className="skeleton-list">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <SkeletonListItem count={4} />
        </li>
      ))}
    </ul>
  </section>
);

export default SkeletonList;
