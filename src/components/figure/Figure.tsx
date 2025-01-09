import { FC } from 'react';
import './_figure.scss';

interface FigureProps {
  alt: string;
  src: string;
  className?: string;
  figcaption?: string;
}

const Figure: FC<FigureProps> = ({ figcaption, src, alt, className = '' }) => (
  <figure className={className}>
    <img src={src} alt={alt} />
    {figcaption && <figcaption>{figcaption}</figcaption>}
  </figure>
);

export default Figure;
