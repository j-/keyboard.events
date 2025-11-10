import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import { memo } from 'react';
import { theme } from '../code-theme';
import { metaKeyboardEventLocationFn } from './MetaKeyboardEventLocation';
import { metaKeyboardEventPhaseFn } from './MetaKeyboardEventPhase';
import { ObjectViewObject } from './ObjectView/ObjectViewObject';

export const complexTypes = [
  Element,
  HTMLElement,
  SVGElement,
  Window,
  Document,
];

export const interestingKeys = [
  'type',
  'key',
  'code',
  'location',
  'ctrlKey',
  'shiftKey',
  'altKey',
  'metaKey',
  'repeat',
  'isComposing',
  'charCode',
  'keyCode',
  'which',
];

export type PaperInspectKeyboardEventProps = {
  event?: KeyboardEvent;
  showUninteresting: boolean;
};

export const PaperInspectKeyboardEvent = memo<PaperInspectKeyboardEventProps>(({
  event,
  showUninteresting,
}) => {
  if (!event) return null;

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ overflowX: 'auto', maxWidth: '100%' }}>
        <ThemeProvider theme={theme}>
          <ObjectViewObject
            name={event.constructor.name}
            value={event}
            complexTypes={complexTypes}
            keys={showUninteresting ? undefined : interestingKeys}
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
