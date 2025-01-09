import { FC, ReactNode } from 'react';
import './_figure.scss';

interface FigureProps {
  alt?: string;
  className?: string;
  figcaption?: string | ReactNode;
  src?: string;
}

const Figure: FC<FigureProps> = ({
  figcaption,
  src = '/images/default.png',
  alt = '',
  className = '',
}) => (
  <figure className={className}>
    {figcaption && <figcaption>{figcaption}</figcaption>}
    <img src={src} alt={alt} />
  </figure>
);

export default Figure;
