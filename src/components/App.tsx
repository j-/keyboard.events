import { ThemeProvider } from '@mui/material';
import type { FC } from 'react';
import { shadTheme } from '../theme';
import { AppContent } from './AppContent';
import { Main } from './Main';

export const App: FC = () => {
  return (
    <ThemeProvider theme={shadTheme('light')}>
      <Main choke={2} sx={{ p: 2 }}>
        <AppContent />
      </Main>
    </ThemeProvider>
  );
};
