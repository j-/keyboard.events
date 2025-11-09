import { useEffect, useState } from 'react';

const initIsFullscreen = () => (
  typeof document === 'undefined' ?
    false :
    document.fullscreenElement != null
);

export const useIsFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(initIsFullscreen);

  useEffect(() => {
    setIsFullscreen(initIsFullscreen);
    const handler = () => setIsFullscreen(initIsFullscreen);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return isFullscreen;
};
