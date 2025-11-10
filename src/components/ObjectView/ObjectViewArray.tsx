import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { getArrayName } from './utils';
import { ObjectView } from './index';

export const ObjectViewArray = memo<{ value: unknown[] }>(({ value }) => {
  if (value.length === 0) {
    return (
      <>
        <Typography
          component="span"
          fontFamily="monospace"
          fontStyle="italic"
          color="hsl(150, 40%, 40%)"
        >
          {getArrayName(value)}
        </Typography>

        {' '}

        <Typography component="span" color="gray.300" fontFamily="monospace">
          {'[]'}
        </Typography>
      </>
    );
  }

  return (
    <>
      <Typography
        component="span"
        fontFamily="monospace"
        fontStyle="italic"
        color="hsl(150, 40%, 40%)"
      >
        {getArrayName(value)}
      </Typography>

      {' '}

      <Typography component="span" color="gray.300" fontFamily="monospace">
        {'['}
      </Typography>

      <Box component="ul" p={0} m={0} ml="2ch">
        {Array.from(value).map((value, i, arr) => [
          <Box
            key={i}
            component="li"
            display="inline"
            value={i}
            sx={{ listStyle: 'none' }}
          >
            <ObjectView value={value} />
          </Box>,

          i < arr.length - 1 ? (
            <Typography
              key={i + ','}
              component="span"
              color="gray.300"
              fontFamily="monospace"
            >
              {', '}
            </Typography>
          ) : null,
        ])}
      </Box>

      <Typography component="span" color="gray.300" fontFamily="monospace">
        {']'}
      </Typography>
    </>
  );
});
