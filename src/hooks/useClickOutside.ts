import { useEffect } from 'react';

type ContainerRefs =
  | { current: Map<HTMLElement, HTMLElement> }
  | { current: HTMLElement | null };

const useClickOutside = (
  containerRefs: ContainerRefs,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      let clickedOutside = false;

      if ('current' in containerRefs && containerRefs.current instanceof Map) {
        clickedOutside = Array.from(containerRefs.current.values()).every(
          (ref) => !ref.contains(event.target as Node),
        );
      } else if (
        'current' in containerRefs &&
        containerRefs.current instanceof HTMLElement
      ) {
        clickedOutside = !containerRefs.current.contains(event.target as Node);
      }

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
