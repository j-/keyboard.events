import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider } from '@mui/material/styles';
import { useState, type FC } from 'react';
import { shadTheme } from '../theme';
import { AppMainContent } from './AppMainContent';
import { AppSidebarContent } from './AppSidebarContent';
import { Main } from './Main';
import { Sidebar } from './Sidebar';
import { useAppContext } from '../hooks/use-app-context';

const drawerWidth = 400;

export const App: FC = () => {
  const { persistSidebar } = useAppContext();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <ThemeProvider theme={shadTheme('light')}>
      <Sidebar
        variant={persistSidebar ? 'permanent' : 'temporary'}
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
        <IconButton onClick={() => {
          setDrawerOpen((drawerOpen) => !drawerOpen);
        }}>
          {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>

        <Box m={2}>
          <AppMainContent />
        </Box>
      </Main>
    </ThemeProvider>
  );
};
