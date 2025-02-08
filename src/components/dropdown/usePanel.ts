import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import useKeyPress from '../../hooks/useKeyPress';
import { KeyCode } from '../../types/enums';

const usePanel = () => {
  const location = useLocation();
  const [isPanelHidden, setIsPanelHidden] = useState(true);

  useKeyPress(() => setIsPanelHidden(true), [KeyCode.Esc]);

  const handleTogglePanel = () => {
    setIsPanelHidden(!isPanelHidden);
  };

  const handleHidePanel = () => {
    setIsPanelHidden(true);
  };

  useEffect(() => {
    setIsPanelHidden(true);
  }, [location]);

  return {
    isPanelHidden,
    onTogglePanel: handleTogglePanel,
    onHidePanel: handleHidePanel,
  };
};

export default usePanel;
