import { FC } from 'react';
import './_progress-bar.scss';

const ProgressBar: FC = () => (
  <div className="progress-bar-container">
    <span
      className="progress-bar"
      role="progressbar"
      aria-label="progress bar"
      aria-valuetext="progress bar"
    />
  </div>
);

export default ProgressBar;
