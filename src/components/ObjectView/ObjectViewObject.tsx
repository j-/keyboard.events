import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { memo, type FC, type ReactNode } from 'react';
import { ObjectViewComplex } from './ObjectViewComplex';
import { getObjectName, orderedKeys } from './utils';
import { ObjectView } from '.';

// eslint-disable-next-line @typescript-eslint/ban-types
const isComplex = (value: unknown, types: Function[]) => (
  types.some((Type) => value instanceof Type)
);

type ObjectViewObjectProps = {
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  complexTypes?: Function[];
  customViews?: Map<string, FC<{ name?: string; value: Record<string, unknown> }>>;
  keys?: string[];
  comments?: Map<string, (value: unknown) => ReactNode>;
};

export const ObjectViewObject = memo<ObjectViewObjectProps>(({
  value: parent,
  name = getObjectName(parent),
  complexTypes = [],
  customViews = new Map(),
  keys = orderedKeys(parent),
  comments = new Map(),
}) => {
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
        {'length' in parent ? `${name}(${parent.length})` : name}{' '}
      </Typography>

      <Typography component="span" color="gray.300" fontFamily="monospace">
        {'{'}
      </Typography>

      <Box component="ul" p={0} m={0} ml="2ch">
        {keys.map((key, i, arr) => {
          const CustomView = customViews.get(key);

          return [
            <Box
              key={key}
              component="li"
              sx={{ display: 'inline', listStyle: 'none', whiteSpace: 'nowrap' }}
            >
              <Typography
                component="span"
                color={typeof parent[key] === 'function' ? 'textDisabled' : 'inherit'}
                fontFamily="monospace"
              >
                {key}
                {': '}
              </Typography>

              {
                // Is a custom view defined?
                customViews.has(key) ? <CustomView name={key} value={parent[key]} /> :
                // Otherwise, is the value too complex to render?
                isComplex(parent[key], complexTypes) ? <ObjectViewComplex value={parent[key]} /> :
                // Otherwise just render it like any other value.
                <ObjectView value={parent[key]} />
              }
            </Box>,

            i < arr.length - 1 ? (
              <Typography
                key={i + ','}
                component="span"
                color="gray.300"
                fontFamily="monospace"
              >
                {','}
              </Typography>
            ) : null,

            (() => {
              const commentFn = comments.get(key);
              if (!commentFn) return null;

              const comment = commentFn(parent[key]);
              if (!comment) return null;

              return (
                <Typography
                  key={i + '//'}
                  component="span"
                  color="hsl(150, 40%, 40%)"
                  fontFamily="monospace"
                >
                  {' // '}{comment}
                </Typography>
              );
            })(),

            i < arr.length - 1 ? (
              <br key="br" />
            ) : null,
          ];
        })}
      </Box>

      <Typography component="span" color="gray.300" fontFamily="monospace">
        {'}'}
      </Typography>
    </>
  );
});
