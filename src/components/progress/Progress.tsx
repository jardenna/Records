import { FC } from 'react';
import './_progress.scss';

interface ProgressProps {
  bgcolor: string;
  completed: number;
}

const Progress: FC<ProgressProps> = ({ bgcolor, completed }) => {
  const fillerStyles = {
    width: `${completed}%`,
    backgroundColor: bgcolor,
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
