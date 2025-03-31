import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
// import analyze from "rollup-plugin-analyzer";
import iconsData from './public/icons.json';
import { visualizer } from 'rollup-plugin-visualizer';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
const { icons } = iconsData;

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        terser({
          compress: {
            dead_code: true,
            drop_console: true,
            drop_debugger: true,
          },
        }),
      ],
      // Checking vendor size - 585kb was the result
      // output: {
      //   manualChunks(id) {
      //     if (id.includes('node_modules')) {
      //       return 'vendor'
      //     }
      //   }
      // }
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },
      manifest: {
        name: 'BingeBox24/7 - Unlimited Streaming for Movies and TV',
        short_name: 'BingeBox',
        description:
          'Stream and collect your favorite movies and TV shows with BingeBox247.',
        theme_color: '#111',
        icons: icons,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,jsx,png,jpg,webp,jpeg}'],
        globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js'],
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        navigateFallback: '/index.html',
        disableDevLogs: true,
      },
    }),
    visualizer({
      filename: './stats.html',
      open: true,
    }),
    nodeResolve(),
  ],
  server: {
    port: 3003,
    host: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
