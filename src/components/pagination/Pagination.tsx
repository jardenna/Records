import { FC } from 'react';
import './_pagination.scss';

export interface PaginationProps {
  currentPage: number;
  onSetCurrentPage: (pageNo: number) => void;
  roundedPaginationCount: number;
  pageLimit?: number; // Optional prop to specify the number of pages shown at a time
}

const Pagination: FC<PaginationProps> = () => (
  <article>
    <ul className="pagination">
      <li>test</li>
    </ul>
  </article>
);

export default Pagination;
