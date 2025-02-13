import { FC } from 'react';
import './_progress.scss';

interface ProgressProps {
  completed: number;
}

const Progress: FC<ProgressProps> = ({ completed }) => (
  <div className="progress-container">
    <span
      style={{ width: `${completed}%` }}
      className="progress-bar"
      role="progressbar"
      aria-label="progress bar"
      aria-valuetext="progress bar"
    />
  </div>
);

export default Progress;
