import { useEffect, useState } from 'react';

const initFullscreenElement = () => (
  typeof document === 'undefined' ?
    false :
    document.fullscreenElement
);

export const useFullscreenElement = () => {
  const [fullscreenElement, setFullscreenElement] = useState(
    initFullscreenElement,
  );

  useEffect(() => {
    const handler = () => {
      setFullscreenElement(initFullscreenElement);
    };

    setFullscreenElement(initFullscreenElement);

    document.addEventListener('fullscreenchange', handler);

    return () => {
      document.removeEventListener('fullscreenchange', handler);
    };
  }, []);

  return fullscreenElement;
};
