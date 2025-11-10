import Typography from '@mui/material/Typography';
import type { FC } from 'react';

export const ObjectViewFunction: FC<{
  // eslint-disable-next-line @typescript-eslint/ban-types
  value: Function;
  onClick?: () => void;
}> = ({ value, onClick }) => (
  <Typography component="span" color="grey.600" fontFamily="monospace">
    {'[function '}

    <Typography
      component="span"
      fontFamily="monospace"
      onClick={onClick}
      // sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
    >
      {value.name}
    </Typography>

    {'()]'}
  </Typography>
);
