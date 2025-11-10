import Typography from '@mui/material/Typography';
import type { FC } from 'react';

export const ObjectViewNumber: FC<{ value: number }> = ({ value }) => (
  <Typography
    key={value}
    component="span"
    fontFamily="monospace"
    color="hsl(150, 40%, 40%)"
  >
    {JSON.stringify(value)}
  </Typography>
);
