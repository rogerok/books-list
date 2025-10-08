import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import process from 'process';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import circleDependency from 'vite-plugin-circular-dependency';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

import { EnvVarsSchema } from './src/shared/config/env/envSchema.ts';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = EnvVarsSchema.safeParse(loadEnv(mode, process.cwd()));

  if (!env.success) {
    throw Error(
      '\n' + env.error.issues.map((issue) => issue.message).join('\n'),
    );
  }

  return {
    base: env.data.VITE_BASE_PATH ?? '/books-list',
    plugins: [
      tanstackRouter({
        routesDirectory: './src/app/routes',
      }),
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
      tsconfigPaths(),
      circleDependency({
        circleImportThrowErr: false,
        outputFilePath: './circleDep',
      }),
    ],
  };
});
