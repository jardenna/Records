import { FC } from 'react';
import './_progress.scss';

type ProgressVariantType = 'primary' | 'secondary';
interface ProgressProps {
  progressPercentage: number;
  variant?: ProgressVariantType;
}

const Progress: FC<ProgressProps> = ({
  progressPercentage,
  variant = 'primary',
}) => (
  <div
    className="progress-container"
    role="progressbar"
    aria-label="progress bar"
  >
    <span
      style={{ width: `${progressPercentage}%` }}
      className={`progress-bar  ${variant}`}
      aria-valuetext={`Progress ${progressPercentage}% completed`}
    />
  </div>
);

export default Progress;
