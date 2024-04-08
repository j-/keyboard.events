import { FC, HTMLAttributes } from 'react';
import { OS, useOS } from './use-os';
import { Button } from './Button';
import classNames from 'classnames';

const FullscreenMessage: FC = () => {
  const os = useOS();
  switch (os) {
    case OS.WIN: return <>Disables the Windows button, Ctrl+W, Alt+Tab, Alt+F4 etc.</>;
    case OS.MAC: return <>Disables Cmd+W, Cmd+Q, Cmd+H etc.</>;
    default: return null;
  }
};

export const FullscreenButton: FC<HTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <Button className={classNames('inline-flex flex-col sm:flex-row gap-2', className)} {...props}>
    <strong>Go fullscreen</strong>
    <FullscreenMessage />
  </Button>
);
