import { FC } from 'react';
import './_details.scss';

interface DetailsContentProps {
  label: string;
  text: string | number;
  isPrice?: boolean;
}

const DetailsContent: FC<DetailsContentProps> = ({ text, label, isPrice }) => (
  <div className="flex details-info">
    <span className="details-label">{label}:</span>
    <span>
      {text}
      {isPrice && ',00'}
    </span>
  </div>
);

export default DetailsContent;
