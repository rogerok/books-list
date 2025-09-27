import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  css: {},
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    tanstackRouter({
      routesDirectory: './src/app/routes',
    }),
  ],
});
