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
      <div style={fillerStyles} className="filler-styles" />
    </div>
  );
};

export default Progress;
