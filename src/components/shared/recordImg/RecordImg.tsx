import { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import useWindowDimensions from '../../../hooks/useWindowDimensions ';
import ErrorBoundaryFallback from '../../ErrorBoundaryFallback';
import Figure from '../../figure/Figure';
import './_record-img.scss';

interface RecordImgProps {
  alt: string;
  src: string;
  Subtitle?: string;
  previewUrl?: string | null;
  refetch?: () => void;
  title?: string;
}

const RecordImg: FC<RecordImgProps> = ({
  title,
  Subtitle,
  src,
  alt,
  previewUrl,
  refetch,
}) => {
  let imageSource = '/images/uploads/default.png';
  const { isMobileSize } = useWindowDimensions();

  if (previewUrl?.trim()) {
    imageSource = previewUrl;
  } else if (src.trim()) {
    imageSource = `/images/uploads/${src}`;
  }

  return (
    <div className="record-img-container">
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
              {Subtitle && (
                <h3 className="record-img-sub-title">
                  {!isMobileSize && <span> / </span>}
                  {Subtitle}
                </h3>
              )}
            </div>
          }
        />
      </ErrorBoundary>
    </div>
  );
};

export default RecordImg;
