import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import { memo, useMemo } from 'react';
import { theme } from '../code-theme';
import { COMPLEX_TYPES, INTERESTING_KEYS } from '../constants';
import { metaKeyboardEventLocationFn } from '../utils/keyboard-event-location';
import { metaKeyboardEventPhaseFn } from '../utils/keyboard-event-phase';
import { getObjectName } from '../utils/object-name';
import { ObjectViewObject } from './ObjectView/ObjectViewObject';

export type PaperInspectKeyboardEventProps = {
  event?: KeyboardEvent;
  showUninteresting: boolean;
};

export const PaperInspectKeyboardEvent = memo<PaperInspectKeyboardEventProps>(({
  event,
  showUninteresting,
}) => {
  const keys = useMemo(() => {
    return showUninteresting ? undefined : [...INTERESTING_KEYS];
  }, [showUninteresting]);

  if (!event) return null;

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ overflowX: 'auto', maxWidth: '100%' }}>
        <ThemeProvider theme={theme}>
          <ObjectViewObject
            name={getObjectName(event)}
            value={event}
            complexTypes={COMPLEX_TYPES}
            keys={keys}
            comments={comments}
          />
        </ThemeProvider>
      </Box>
    </Paper>
  );
});

const keyCommentFn = (value: string) => {
  const isEscaped = typeof value === 'string' && /\\|"/.test(value);

  if (!isEscaped) return null;

  return String(value);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const comments = new Map<string, any>([
  ['eventPhase', metaKeyboardEventPhaseFn],
  ['key', keyCommentFn],
  ['location', metaKeyboardEventLocationFn],
]);
