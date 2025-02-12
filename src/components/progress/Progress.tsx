import { FC } from 'react';
import './_progress.scss';

interface ProgressProps {
  completed: number;
}

const Progress: FC<ProgressProps> = ({ completed }) => {
  const fillerStyles = {
    width: `${completed}%`,
  };

  return (
    <div className="progress-container">
      <div style={fillerStyles} className="filler-styles">
        <span className="label">{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default Progress;
