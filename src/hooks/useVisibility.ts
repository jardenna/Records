import { useEffect, useRef, useState } from 'react';

const useVisibility = (
  isOpen: boolean,
  closeCallback?: () => void,
  transitionDuration = 500,
) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleClose = () => {
    setIsVisible(false);
    if (closeCallback) {
      timeoutRef.current = window.setTimeout(closeCallback, transitionDuration);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      handleClose();
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen]);

  return { isVisible, handleClose };
};

export default useVisibility;
