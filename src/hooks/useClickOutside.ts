import { useEffect } from 'react';

type ContainerRefs = {
  current: Map<HTMLElement, HTMLElement>;
};

const useClickOutside = (
  containerRefs: ContainerRefs,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const clickedOutside = Array.from(containerRefs.current.values()).every(
        (ref) => ref && !ref.contains(event.target as Node),
      );

      if (clickedOutside) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [containerRefs, callback]);
};

export default useClickOutside;
