import classNames from 'classnames';
import { FC, HTMLAttributes } from 'react';
import { OS, useOS } from '../hooks/use-os';
import { Button } from './Button';

const ExitFullscreenMessage: FC = () => {
  const os = useOS();
  switch (os) {
    case OS.WIN:
    case OS.MAC:
      return <>Press and hold escape key to exit.</>;
    case OS.AND:
      return <>Swipe down from top of screen and press back button to exit.</>;
    default:
      return null;
  }
};

export const ExitFullscreenButton: FC<HTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <Button className={classNames('inline-flex flex-col sm:flex-row gap-2', className)} {...props}>
    <strong>Exit fullscreen</strong>
    <ExitFullscreenMessage />
  </Button>
);
