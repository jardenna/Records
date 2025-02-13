import { FC } from 'react';
import './_progress.scss';

interface ProgressProps {
  progressPercentage: number;
}

const Progress: FC<ProgressProps> = ({ progressPercentage }) => (
  <div className="progress-container">
    <span
      style={{ width: `${progressPercentage}%` }}
      className="progress-bar"
      role="progressbar"
      aria-label="progress bar"
      aria-valuetext={`Progress ${progressPercentage}% completed`}
    />
  </div>
);

export default Progress;
