import { useEffect, useState } from "react"

export const useIsFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(() => document.fullscreenElement != null);

  useEffect(() => {
    const handler = () => {
      setIsFullscreen(document.fullscreenElement != null);
    };

    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return isFullscreen;
};
