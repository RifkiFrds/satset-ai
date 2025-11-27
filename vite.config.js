import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon-196.png',
        'apple-touch-icon.png',
        'manifest-icon-192.maskable.png',
        'manifest-icon-512.maskable.png'
      ],
      manifest: {
        name: 'Satset AI',
        short_name: 'Satset',
        description: 'Asisten akademik cerdas untuk mahasiswa.',
        theme_color: '#647DEB',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
        {
          src: 'favicon-196.png',
          sizes: '196x196',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: 'manifest-icon-192.maskable.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: 'manifest-icon-512.maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
            }
          }
        ]
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          lottie: ["lottie-react"],
          gsap: ["gsap"],
          pdf: ["jspdf", "html2canvas", "docx"],
        },
      },
    },
  },
});
