import Box from '@mui/material/Box';
import type { FC } from 'react';
import { useAppContext } from '../hooks/use-app-context';
import { useLatestEvent } from '../hooks/use-latest-event';
import { OptionsLevel } from '../types';
import { PaperGetModifierState } from './PaperGetModifierState';
import { PaperInspectKeyboardEvent } from './PaperInspectKeyboardEvent';

export const AppMainContent: FC = () => {
  const latestEvent = useLatestEvent();
  const { optionsLevel } = useAppContext();

  return (
    <Box
      data-test-id="AppMainContent"
      display="grid"
      gap={2}
      mt={6}
      mb={8}
      mx={{ xs: 2, md: 4 }}
      alignItems={optionsLevel === OptionsLevel.ADVANCED ? 'start' : 'center'}
      justifyContent="center"
      gridTemplateColumns={{
        xs: '60ch',
        lg: '60ch 60ch',
      }}
    >
      <PaperInspectKeyboardEvent
        event={latestEvent}
        showUninteresting={optionsLevel === OptionsLevel.ADVANCED}
      />

      <PaperGetModifierState
        event={latestEvent}
      />
    </Box>
  );
};
