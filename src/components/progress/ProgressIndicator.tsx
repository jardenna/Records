import { FC } from 'react';

interface ProgressIndicatorProps {
  progressPercentage: number;
  ariaValuetext?: string;
  variant?: string;
}

const ProgressIndicator: FC<ProgressIndicatorProps> = ({
  ariaValuetext,
  progressPercentage,
  variant = 'primary',
}) => (
  <span
    style={{ width: `${progressPercentage || 0}%` }}
    className={`progress-bar ${variant}`}
    role="progressbar"
    aria-label="progress bar"
    aria-valuetext={ariaValuetext}
  />
);

export default ProgressIndicator;
