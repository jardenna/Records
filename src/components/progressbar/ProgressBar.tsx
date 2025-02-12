import { FC } from 'react';
import './_progress-bar.scss';

interface ProgressBarProps {}

const ProgressBar: FC<ProgressBarProps> = () => (
  <div className="progress-bar-container">
    <div
      className="progress-bar"
      role="progressbar"
      aria-label="progress bar"
      aria-valuetext="progress bar"
    />
  </div>
);

export default ProgressBar;
