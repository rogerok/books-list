import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  css: {},
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    svgr({
      svgrOptions: {
        icon: true,
        ref: true,
        svgo: true,
        titleProp: true,
      },
    }),
    tanstackRouter({
      routesDirectory: './src/app/routes',
    }),
  ],
});
