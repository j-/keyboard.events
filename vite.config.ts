import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'keyboard.events',
        short_name: 'keyboard.events',
        description: 'Inspect JavaScript KeyboardEvents and their keys, codes, locations, and modifier keys.',
        theme_color: '#242424',
        icons: [
          {
            src: 'maskable_icon.svg',
            sizes: '48x48 72x72 96x96 128x128 384x384 512x512',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'maskable_icon_x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: 'maskable_icon_x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'maskable_icon_x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'maskable_icon_x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'maskable_icon_x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'maskable_icon_x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'maskable_icon_x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable_icon.png',
            sizes: '1024x1024',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'maskable_icon.png',
            sizes: '1024x1024',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
