import { FC } from 'react';
import './_pagination.scss';

interface PaginationProps {}

const Pagination: FC<PaginationProps> = () => {
  console.log(123);

  return (
    <article>
      <ul className="pagination">
        <li className="pagination-item">
          <button type="button">1</button>
        </li>
        <li className="pagination-item">
          <button type="button">2</button>
        </li>
        <li className="pagination-item">
          <button type="button">3</button>
        </li>
      </ul>
    </article>
  );
};

export default Pagination;
