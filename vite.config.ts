import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import circleDependency from 'vite-plugin-circular-dependency';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
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
    tsconfigPaths(),
    circleDependency({
      circleImportThrowErr: false,
      outputFilePath: './circleDep',
    }),
  ],
});
