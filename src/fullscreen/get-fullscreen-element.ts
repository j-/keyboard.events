export const getFullscreenElement = (documentArg = document): Element | null => (
  documentArg.fullscreenElement ??
  documentArg.webkitFullscreenElement ??
  documentArg.mozFullScreenElement ??
  documentArg.msFullscreenElement ??
  null
);
