import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const usePanel = () => {
  const location = useLocation();
  const [isPanelHidden, setIsPanelHidden] = useState(true);

  const handleTogglePanel = () => {
    setIsPanelHidden(!isPanelHidden);
  };

  useEffect(() => {
    setIsPanelHidden(true);
  }, [location]);

  return { isPanelHidden, onTogglePanel: handleTogglePanel };
};

export default usePanel;
