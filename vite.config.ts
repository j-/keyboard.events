import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import 'dotenv/config';

const GOOGLE_ANALYTICS_ID = 'G-VSP3XYY5YP';
const UMAMI_WEBSITE_ID = '49c4411b-ba02-4b69-b2ea-8f731d3cd527';

// Inject analytics into production builds only so dev traffic isn't tracked.
const analytics = (): Plugin => ({
  name: 'analytics',
  apply: 'build',
  transformIndexHtml: () => [
    {
      tag: 'script',
      attrs: {
        async: true,
        src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`,
      },
      injectTo: 'body',
    },
    {
      tag: 'script',
      children: [
        'window.dataLayer = window.dataLayer || [];',
        'function gtag(){dataLayer.push(arguments);}',
        `gtag('js', new Date());`,
        `gtag('config', '${GOOGLE_ANALYTICS_ID}');`,
      ].join('\n'),
      injectTo: 'body',
    },
    {
      tag: 'script',
      attrs: {
        defer: true,
        src: 'https://skeoh-umami.fly.dev/script.js',
        'data-website-id': UMAMI_WEBSITE_ID,
      },
      injectTo: 'body',
    },
  ],
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [
      react(),
      analytics(),
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
      // Only include the Sentry Vite plugin for production builds
      // (avoids touching Sentry during local dev).
      ...(isProd && process.env.SENTRY_DSN ? [
        sentryVitePlugin(),
      ] : []),
    ],
  };
});
