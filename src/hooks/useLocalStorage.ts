import { useEffect, useState } from 'react';

const useLocalStorage = (
  storageKey: string,
  fallbackState: number | string,
) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(storageKey) || 'null') ?? fallbackState,
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

export default useLocalStorage;
