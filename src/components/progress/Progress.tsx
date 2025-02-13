import { FC } from 'react';
import './_progress.scss';
import ProgressIndicator from './ProgressIndicator';

interface ProgressProps {
  progressPercentage: number;
}

const Progress: FC<ProgressProps> = ({ progressPercentage }) => (
  <div className="progress-container">
    <ProgressIndicator
      progressPercentage={progressPercentage}
      ariaValuetext={`Progress ${progressPercentage}% completed`}
    />
  </div>
);

export default Progress;
