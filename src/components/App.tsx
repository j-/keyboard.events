import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState, type FC } from 'react';
import { useAppContext } from '../hooks/use-app-context';
import { shadTheme } from '../theme';
import { AppMainContent } from './AppMainContent';
import { AppSidebarContent } from './AppSidebarContent';
import { Main } from './Main';
import { Sidebar } from './Sidebar';
import { ToggleSidebarButton } from './ToggleSidebarButton';

const drawerWidth = 400;

export const App: FC = () => {
  const { persistSidebar, preventDefault, setPreventDefault } = useAppContext();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!preventDefault) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && e.repeat) {
        setPreventDefault(false);
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [preventDefault, setPreventDefault]);

  return (
    <>
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

      <Snackbar
        open={preventDefault}
        message="Preventing default keyboard behavior. Hold Esc to cancel."
        action={
          <Button
            variant="contained"
            size="small"
            onClick={() => setPreventDefault(false)}
          >
            Cancel
          </Button>
        }
      />
    </>
  );
};
