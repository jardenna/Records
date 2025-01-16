import { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../../errorBoundary/ErrorBoundaryFallback';
import Figure from '../../figure/Figure';
import './_record-img.scss';

interface RecordImgProps {
  alt: string;
  src: string;
  title: string | null;
  Subtitle?: string;

  previewUrl?: string | null;
  refetch?: () => void;
}

const RecordImg: FC<RecordImgProps> = ({
  title,
  Subtitle,
  src,
  alt,
  previewUrl,
  refetch,
}) => {
  let imageSource = '/images/default.png';

  if (previewUrl?.trim()) {
    imageSource = previewUrl;
  } else if (src.trim()) {
    imageSource = `/images/${src}`;
  }

  return (
    <section className="record-img-container">
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetch}
      >
        <Figure
          src={imageSource}
          alt={alt}
          figcaption={
            <div className="record-img-header">
              <h2 className="record-img-title text-ellipsis">{title}</h2>
              {Subtitle && <span>/</span>}
              <h3 className="record-img-sub-title">{Subtitle}</h3>
            </div>
          }
        />
      </ErrorBoundary>
    </section>
  );
};
export default RecordImg;
