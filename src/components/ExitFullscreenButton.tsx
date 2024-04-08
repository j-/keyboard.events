import { FC, HTMLAttributes } from 'react';
import { Button } from './Button';

export const ExitFullscreenButton: FC<HTMLAttributes<HTMLButtonElement>> = (props) => (
  <Button {...props}>
    Exit fullscreen
  </Button>
);
