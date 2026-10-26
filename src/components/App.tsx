import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { ThemeProvider } from '@mui/material/styles';
import { captureException } from '@sentry/react';
import { useEffect, useState, type FC } from 'react';
import { DRAWER_WIDTH } from '../constants';
import { canRequestFullscreen } from '../fullscreen/can-request-fullscreen';
import { exitFullscreen } from '../fullscreen/exit-fullscreen';
import { FULLSCREEN_CHANGE_EVENTS } from '../fullscreen/fullscreen-change-events';
import { getFullscreenElement } from '../fullscreen/get-fullscreen-element';
import { requestFullscreen } from '../fullscreen/request-fullscreen';
import { useIsFullscreen } from '../fullscreen/use-is-fullscreen';
import { useAppContext } from '../hooks/use-app-context';
import { shadTheme } from '../theme';
import { assert } from '../utils/assert';
import { AppMainContent } from './AppMainContent';
import { AppSidebarContent } from './AppSidebarContent';
import { Main } from './Main';
import { MaybeTestInput } from './MaybeTestInput';
import { Sidebar } from './Sidebar';
import { ToggleSidebarButton } from './ToggleSidebarButton';

export const App: FC = () => {
  const { persistSidebar, preventDefault, setPreventDefault } = useAppContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isFullscreen = useIsFullscreen();

  // Fullscreen can be exited via browser UI as well as the unlock button, so
  // clean up whenever it ends rather than in each handler.
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (getFullscreenElement(document) != null) return;
      navigator.keyboard?.unlock?.();
      setPreventDefault(false);
    };

    for (const type of FULLSCREEN_CHANGE_EVENTS) {
      document.addEventListener(type, handleFullscreenChange);
    }

    return () => {
      for (const type of FULLSCREEN_CHANGE_EVENTS) {
        document.removeEventListener(type, handleFullscreenChange);
      }
    };
  }, [setPreventDefault]);

  useEffect(() => {
    if (!preventDefault) return;

    const handleKeydown = async (e: KeyboardEvent) => {
      if (e.key === 'Escape' && e.repeat) {
        setPreventDefault(false);
        await exitFullscreen();
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
          width={DRAWER_WIDTH}
          onClose={() => setDrawerOpen(false)}
        >
          <AppSidebarContent />
        </Sidebar>

        <Main
          data-test-id="App-main"
          choke={2}
          drawerOpen={drawerOpen}
          drawerWidth={DRAWER_WIDTH}
          sx={{
            display: 'grid',
            placeItems: 'center',
            backgroundColor: (theme) => theme.palette.background.default,
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
            {
              canRequestFullscreen(document.documentElement) &&
              typeof navigator.keyboard !== 'undefined' &&
              typeof navigator.keyboard.lock === 'function' ? (
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
                      await exitFullscreen();
                      return;
                    }

                    try {
                      assert(
                        navigator.keyboard,
                        'Expected navigator keyboard API to be defined',
                      );

                      assert(
                        typeof navigator.keyboard.lock === 'function',
                        'Expected keyboard lock to be a function',
                      );

                      await requestFullscreen(document.documentElement);
                      await navigator.keyboard.lock();

                      setPreventDefault(true);
                    } catch (err) {
                      captureException(err);
                      setPreventDefault(false);

                      try {
                        await exitFullscreen();
                      } catch {}
                    }
                  }}
                >
                  {isFullscreen ? 'Unlock keyboard' : 'Lock keyboard'}
                </Button>
              ) : null
            }

            <AppMainContent />
          </Box>
        </Main>

        <MaybeTestInput drawerOpen={drawerOpen} />
      </ThemeProvider>

      <Snackbar
        open={preventDefault}
        message="Preventing default keyboard behavior. Hold Esc to cancel."
        action={
          <Button
            variant="contained"
            size="small"
            onClick={async () => {
              setPreventDefault(false);
              await exitFullscreen();
            }}
          >
            Cancel
          </Button>
        }
      />
    </>
  );
};
