import { FC } from 'react';

interface DetailsContentProps {
  label: string;
  text: string | number;
}

const DetailsContent: FC<DetailsContentProps> = ({ text, label }) => (
  <div className="flex details-info">
    <span className="details-label">{label}:</span>
    <span>{text}</span>
  </div>
);

export default DetailsContent;
