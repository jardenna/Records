import React, { useEffect, useState } from 'react';

import './_ani.scss';
import Portal from './Portal';

const AnimatedComponent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 103000); // Hide after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Portal
      portalId="animated-portal"
      className={isVisible ? 'transition' : 'dismissed'}
    >
      <div className="top-right">
        <div className="content">This is an animated component!</div>
      </div>
    </Portal>
  );
};

export default AnimatedComponent;
