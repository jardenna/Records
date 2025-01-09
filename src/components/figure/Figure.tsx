import { FC, ReactNode } from 'react';
import './_figure.scss';

interface FigureProps {
  src: string;
  alt?: string;
  className?: string;
  figcaption?: string | ReactNode;
}

const Figure: FC<FigureProps> = ({
  figcaption,
  src,
  alt = '',
  className = '',
}) => (
  <figure className={className}>
    {figcaption && <figcaption>{figcaption}</figcaption>}
    <img src={src} alt={alt} />
  </figure>
);

export default Figure;
