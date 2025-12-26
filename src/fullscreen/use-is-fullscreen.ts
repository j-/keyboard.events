import { useFullscreenElement } from './use-fullscreen-element';

export const useIsFullscreen = () => (
  useFullscreenElement() != null
);
