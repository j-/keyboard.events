import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import * as Sentry from "@sentry/react";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { App } from './components/App.tsx';
import { AppProvider } from './context/AppContext';
import './index.css';
import { EventProvider } from './context/EventContext';
import { InputRefProvider } from './context/InputRefContext/provider.tsx';
import { shadTheme } from './theme.ts';

if ('serviceWorker' in navigator) {
  registerSW();
}

Sentry.init({
  dsn: 'https://8856cdf001662052f0d192e6f968063d@o4506046801444864.ingest.us.sentry.io/4510599775584256',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: false,
});

const root = createRoot(document.getElementById('root')!, {
  // Callback called when an error is thrown and not caught by an ErrorBoundary.
  onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
    console.warn('Uncaught error', error, errorInfo.componentStack);
  }),
  // Callback called when React catches an error in an ErrorBoundary.
  onCaughtError: Sentry.reactErrorHandler(),
  // Callback called when React automatically recovers from errors.
  onRecoverableError: Sentry.reactErrorHandler(),
});

root.render(
  <StrictMode>
    <ThemeProvider theme={shadTheme('dark')}>
      <CssBaseline />
      <InputRefProvider>
        <AppProvider>
          <EventProvider>
            <App />
          </EventProvider>
        </AppProvider>
      </InputRefProvider>
    </ThemeProvider>
  </StrictMode>,
);
