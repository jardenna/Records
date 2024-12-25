/* eslint-disable consistent-return */
import { useEffect } from 'react';

const useTimer = (callback: () => void, delay: number | null) => {
  useEffect(() => {
    if (delay === null) {
      return;
    }

    const timer = setTimeout(callback, delay);
    return () => clearTimeout(timer);
  }, [callback, delay]);
};

export default useTimer;
