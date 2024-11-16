import { FC, useState } from 'react';
import AnimatedComponent from '../components/AnimatedComponent';

const HomePage: FC = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  const handleShowAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 3000); // Hide after 3 seconds
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button type="button" onClick={handleShowAnimation}>
        Show Animation
      </button>
      {showAnimation && <AnimatedComponent />}
    </div>
  );
};

export default HomePage;
