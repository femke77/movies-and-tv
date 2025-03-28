import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from "vite-plugin-pwa";
import analyze from "rollup-plugin-analyzer";
import iconsData from './public/icons.json'

const {icons} = iconsData;

// https://vite.dev/config/
export default defineConfig({
  build: {
      minify: "terser",
      rollupOptions: {
        plugins: [process.env.NODE_ENV === 'production' ? null : analyze()].filter(Boolean),
      },
    },
  plugins: [react(), tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html",
      },
      manifest: {
        name: "BingeBox247 Unlimited Streaming",
        short_name: "BingeBox",
        description: "Keep track of and stream your favorite movies and TV shows with BingeBox247.",
        theme_color: "#111",
        icons: icons
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,jsx}"],
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        navigateFallback: "/index.html",
      }
    }),
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
