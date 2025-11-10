import Typography from '@mui/material/Typography';
import { memo } from 'react';

export const ObjectViewString = memo<{ value: string }>(({ value }) => (
  <Typography
    key={value}
    component="span"
    color="primary"
    fontFamily="monospace"
  >
    {JSON.stringify(value)}
  </Typography>
));
