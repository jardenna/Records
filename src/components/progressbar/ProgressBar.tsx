import { FC } from 'react';
import './_progress-bar.scss';

type ProgressVariantType = 'primary' | 'secondary';
interface ProgressBarProps {
  progressPercentage: number;
  variant?: ProgressVariantType;
}

const ProgressBar: FC<ProgressBarProps> = ({
  progressPercentage,
  variant = 'primary',
}) => (
  <div
    className="progress-bar-container"
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

export default ProgressBar;
