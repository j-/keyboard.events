import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { getObjectName } from '../../utils/object-name';

export const ObjectViewComplex = memo<{ value: unknown }>(({ value }) => (
  <Typography component="span" color="black" fontFamily="monospace">
    {'[object '}

    <Typography
      component="span"
      fontFamily="monospace"
      color="secondary"
    >
      {getObjectName(value)}
    </Typography>

    {']'}
  </Typography>
));
