import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { ThemeProvider } from '@mui/material/styles';
import { Effect } from 'effect';
import { useEffect, useState, type FC } from 'react';
import { useAppContext } from '../hooks/use-app-context';
import { useIsFullscreen } from '../hooks/use-is-fullscreen';
import { shadTheme } from '../theme';
import { lockKeyboard } from '../utils/lock-keyboard';
import { AppMainContent } from './AppMainContent';
import { AppSidebarContent } from './AppSidebarContent';
import { Main } from './Main';
import { Sidebar } from './Sidebar';
import { ToggleSidebarButton } from './ToggleSidebarButton';

const drawerWidth = 400;

export const App: FC = () => {
  const { persistSidebar, preventDefault, setPreventDefault } = useAppContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isFullscreen = useIsFullscreen();

  useEffect(() => {
    if (!preventDefault) return;

    const handleKeydown = async (e: KeyboardEvent) => {
      if (e.key === 'Escape' && e.repeat) {
        setPreventDefault(false);
        if (document.fullscreenElement != null) {
          await document.exitFullscreen();
        }
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
          data-test-id="App-main"
          choke={2}
          drawerOpen={drawerOpen}
          drawerWidth={drawerWidth}
          sx={{
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <ToggleSidebarButton
            onClick={() => {
              setDrawerOpen((drawerOpen) => !drawerOpen);
            }}
            size="large"
            sx={{
              position: 'fixed',
              top: 17,
              justifySelf: 'start',
              m: 1,
            }}
          >
            {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </ToggleSidebarButton>

          <Box m={2}>
            <Button
              variant="contained"
              size="large"
              sx={{
                position: 'fixed',
                top: 0,
                right: 0,
                m: 3,
              }}
              onClick={async () => {
                if (isFullscreen) {
                  await document.exitFullscreen();
                  setPreventDefault(false);
                } else {
                  const promise = lockKeyboard();
                  Effect.runPromise(promise)
                    .then(() => {
                      setPreventDefault(true);
                    })
                    .catch((err) => {
                      console.error('Failed with error', err);
                    });
                }
              }}
            >
              {isFullscreen ? 'Unlock keyboard' : 'Lock keyboard'}
            </Button>

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
            onClick={async () => {
              if (isFullscreen) {
                await document.exitFullscreen();
              }
              setPreventDefault(false);
            }}
          >
            Cancel
          </Button>
        }
      />
    </>
  );
};
