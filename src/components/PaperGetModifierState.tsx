import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { alpha, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { theme } from '../code-theme';
import { MODIFIERS } from '../constants';
import { ObjectViewBoolean } from './ObjectView/ObjectViewBoolean';
import { ObjectViewString } from './ObjectView/ObjectViewString';

export type PaperGetModifierStateProps = {
  event?: KeyboardEvent;
};

export const PaperGetModifierState = memo<PaperGetModifierStateProps>(({
  event,
}) => {
  if (!event) return null;

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ overflowX: 'auto' }}>
        <ThemeProvider theme={theme}>
          {MODIFIERS.map((modifier) => (
            <ModifierStateLine
              key={modifier}
              modifier={modifier}
              state={event.getModifierState(modifier)}
            />
          ))}
        </ThemeProvider>
      </Box>
    </Paper>
  );
});

type ModifierStateLineProps = {
  modifier: string;
  state: boolean;
};

const ModifierStateLine = memo<ModifierStateLineProps>(({
  modifier,
  state,
}) => (
  <Box
    display="flex"
    justifyContent="space-between"
    sx={(theme) => (
      state ?
        { backgroundColor: alpha(theme.palette.primary.main, 0.125), fontWeight: 'bold' } :
        { opacity: 0.75 }
    )}
    py={0.5}
    gap={4}
    height={(theme) => theme.spacing(3)}
  >
    <Typography component="span" color="gray.500" fontFamily="monospace">
      event.getModifierState(<ObjectViewString value={modifier} />);
    </Typography>

    <ObjectViewBoolean value={state} />
  </Box>
));
