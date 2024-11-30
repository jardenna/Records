import { FC } from 'react';
import Figure from './figure/Figure';

interface ImagePreviewProps {
  fileName: string;
  previewUrl: any;
  uploadedPhoto: any;
  altText?: string;
}

const ImagePreview: FC<ImagePreviewProps> = ({
  fileName,
  altText = '',
  uploadedPhoto,
  previewUrl,
}) => (
  <section className="image-preview-wrapper">
    <h2>Billede upload</h2>
    {previewUrl === '' ? (
      <div className="image-preview">
        <Figure src={uploadedPhoto} alt={altText} />
      </div>
    ) : (
      <Figure src={previewUrl} alt={altText} figcaption={fileName} />
    )}
  </section>
);

export default ImagePreview;
