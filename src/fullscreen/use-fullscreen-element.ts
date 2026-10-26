import { useEffect, useState } from 'react';
import { FULLSCREEN_CHANGE_EVENTS } from './fullscreen-change-events';
import { getFullscreenElement } from './get-fullscreen-element';

const initFullscreenElement = () => (
  typeof document === 'undefined' ?
    null :
    getFullscreenElement(document)
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

    for (const type of FULLSCREEN_CHANGE_EVENTS) {
      document.addEventListener(type, handler);
    }

    return () => {
      for (const type of FULLSCREEN_CHANGE_EVENTS) {
        document.removeEventListener(type, handler);
      }
    };
  }, []);

  return fullscreenElement;
};
