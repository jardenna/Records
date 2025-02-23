import { useEffect, useRef, useState } from 'react';
import { KeyCode } from '../types/enums';
import useKeyPress from './useKeyPress';

const useVisibility = (
  isOpen: boolean,
  closeCallback: () => void,
  duration?: number, // Auto-dismiss duration in milliseconds
  transitionDuration = 500, // Animation duration in milliseconds
) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleClosePopup = () => {
    setIsVisible(false);
    timeoutRef.current = window.setTimeout(closeCallback, transitionDuration);
  };

  useKeyPress(handleClosePopup, [KeyCode.Esc]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (duration) {
        timeoutRef.current = window.setTimeout(handleClosePopup, duration);
      }
    } else {
      handleClosePopup();
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, duration]);

  const popupClass = isVisible ? 'is-visible' : 'dismissed';

  return { popupClass, handleClosePopup };
};

export default useVisibility;
