import { FC } from 'react';
import Figure from '../figure/Figure';

interface RecordImgContainerProps {
  artist: string;
  src: string;
  title: string;
}

const RecordImgContainer: FC<RecordImgContainerProps> = ({
  artist,
  title,
  src,
}) => (
  <section className="details-img-container">
    <Figure
      src={src}
      figcaption={
        <div className="details-header">
          <h2 className="details-artist">{artist} / </h2>
          <h3 className="details-title">{title}</h3>
        </div>
      }
    />
  </section>
);

export default RecordImgContainer;
