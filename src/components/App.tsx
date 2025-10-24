import { ThemeProvider } from '@mui/material';
import { useState, type FC } from 'react';
import { shadTheme } from '../theme';
import { AppMainContent } from './AppMainContent';
import { AppSidebarContent } from './AppSidebarContent';
import { Main } from './Main';
import { Sidebar } from './Sidebar';

const drawerWidth = 240;

export const App: FC = () => {
  const [drawerOpen] = useState(false);

  return (
    <ThemeProvider theme={shadTheme('light')}>
      <Sidebar
        open={drawerOpen}
        width={drawerWidth}
      >
        <AppSidebarContent />
      </Sidebar>

      <Main
        choke={2}
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
        sx={{ p: 2 }}
      >
        <AppMainContent />
      </Main>
    </ThemeProvider>
  );
};
