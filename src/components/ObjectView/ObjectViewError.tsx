import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { orderedKeys } from '../../utils/object-keys';
import { getErrorName } from '../../utils/object-name';
import { ObjectViewFunction } from './ObjectViewFunction';
import { ObjectView } from '.';

export const ObjectViewError = memo<{ value: Error | Record<string, unknown> }>(({
  value: parent,
}) => {
  const keys = orderedKeys(parent);

  if (keys.length === 0) {
    return (
      <Typography component="span" color="gray.300" fontFamily="monospace">
        {'{}'}
      </Typography>
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
        {getErrorName(parent)}{' '}
      </Typography>

      <Typography component="span" color="gray.300" fontFamily="monospace">
        {'{'}
      </Typography>

      <Box component="ul" p={0} m={0} ml="2ch">
        {keys.map((key, i, arr) => [
          <Box
            key={key}
            component="li"
            sx={{ display: 'inline', listStyle: 'none', whiteSpace: 'nowrap' }}
          >
            <Typography
              component="span"
              color={typeof parent[key] === 'function' ? 'textDisabled' : 'textPrimary'}
              fontFamily="monospace"
            >
              {key}
              {': '}
            </Typography>

            {typeof parent[key] === 'function' ? (
              <ObjectViewFunction
                value={parent[key]}
                // onClick={async () => console.log(await parent[key]())}
              />
            ) : (
              <ObjectView value={parent[key]} />
            )}
          </Box>,

          i < arr.length - 1 ? (
            <Typography
              key={i + ','}
              component="span"
              color="gray.300"
              fontFamily="monospace"
            >
              {','}
              <br />
            </Typography>
          ) : null,
        ])}
      </Box>

      <Typography component="span" color="gray.300" fontFamily="monospace">
        {'}'}
      </Typography>
    </>
  );
});
