import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { App } from './components/App.tsx';
import './index.css';
import { shadTheme } from './theme.ts';

if ('serviceWorker' in navigator) {
  registerSW();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={shadTheme('dark')}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
