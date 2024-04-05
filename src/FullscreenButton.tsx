import { FC, HTMLAttributes } from 'react';
import { OS, useOS } from './use-os';

const FullscreenMessage: FC = () => {
  const os = useOS();
  switch (os) {
    case OS.WIN: return <>Disables the Windows button, Ctrl+W, Alt+Tab, Alt+F4 etc.</>;
    case OS.MAC: return <>Disables Cmd+W, Cmd+Q, Cmd+H etc.</>;
    default: return null;
  }
};

export const FullscreenButton: FC<HTMLAttributes<HTMLButtonElement>> = (props) => (
  <button
    className="bg-neutral-900 hover:bg-neutral-700 text-white text-start py-2 px-4 rounded"
    type="button"
    {...props}
  >
    <strong>Go fullscreen</strong>
    <br />
    <FullscreenMessage />
  </button>
);
