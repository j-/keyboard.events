import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { useState, type FC } from 'react';
import { useAppContext } from '../hooks/use-app-context';
import { shadTheme } from '../theme';
import { AppMainContent } from './AppMainContent';
import { AppSidebarContent } from './AppSidebarContent';
import { Main } from './Main';
import { Sidebar } from './Sidebar';
import { ToggleSidebarButton } from './ToggleSidebarButton';

const drawerWidth = 400;

export const App: FC = () => {
  const { persistSidebar } = useAppContext();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <ThemeProvider theme={shadTheme('light')}>
      <Sidebar
        variant={persistSidebar ? 'persistent' : 'temporary'}
        open={drawerOpen}
        width={drawerWidth}
        onClose={() => setDrawerOpen(false)}
      >
        <AppSidebarContent />
      </Sidebar>

      <Main
        choke={2}
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
      >
        <ToggleSidebarButton
          onClick={() => {
            setDrawerOpen((drawerOpen) => !drawerOpen);
          }}
          sx={{
            position: 'fixed',
            top: 17,
          }}
        >
          {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </ToggleSidebarButton>

        <Box m={2}>
          <AppMainContent />
        </Box>
      </Main>
    </ThemeProvider>
  );
};
