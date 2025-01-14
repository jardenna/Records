import { FC } from 'react';
import Figure from '../../figure/Figure';
import './_record-img.scss';

interface RecordImgProps {
  alt: string;
  src: string;
  title: string | null;
  Subtitle?: string;
  previewUrl?: string | null;
}

const RecordImg: FC<RecordImgProps> = ({
  title,
  Subtitle,
  src,
  alt,
  previewUrl,
}) => {
  let imageSource = '/images/default.png';

  if (previewUrl?.trim()) {
    imageSource = previewUrl;
  } else if (src.trim()) {
    imageSource = `/images/${src}`;
  }

  return (
    <section className="record-img-container">
      <Figure
        src={imageSource}
        alt={alt}
        figcaption={
          <div className="record-img-header">
            <h2 className="record-img-title">{title}</h2>
            {Subtitle && <span>/</span>}
            <h3 className="record-img-sub-title">{Subtitle}</h3>
          </div>
        }
      />
    </section>
  );
};
export default RecordImg;
