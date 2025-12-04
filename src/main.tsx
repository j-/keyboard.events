import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
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
  </React.StrictMode>,
);
