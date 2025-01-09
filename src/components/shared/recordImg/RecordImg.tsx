import { FC } from 'react';
import Figure from '../../figure/Figure';
import './_record-img.scss';

interface RecordImgProps {
  artist: string;
  src: string;
  title: string;
}

const RecordImg: FC<RecordImgProps> = ({ artist, title, src }) => (
  <section className="record-img-container">
    <Figure
      src={src}
      figcaption={
        <div className="record-img-header">
          <h2 className="record-img-artist">{artist} / </h2>
          <h3 className="record-img-title">{title}</h3>
        </div>
      }
    />
  </section>
);

export default RecordImg;
