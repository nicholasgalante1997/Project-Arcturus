import 'dotenv/config';

import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type Plugin } from 'vite';

const root = process.cwd();

/**
 * Only these `process.env.*` keys are inlined into the browser bundle.
 * Anything else referenced via `process.env` in browser code will be `undefined`.
 */
const BROWSER_ENV_KEYS = ['SENTRY_DSN', 'SENTRY_RELEASE', 'ARCJR_PRERENDERING'] as const;

function defineBrowserEnv(mode: string): Record<string, string> {
  const defines: Record<string, string> = {
    'process.env.NODE_ENV': JSON.stringify(mode === 'development' ? 'development' : 'production')
  };
  for (const key of BROWSER_ENV_KEYS) {
    const value = process.env[key];
    defines[`process.env.${key}`] = value === undefined ? 'undefined' : JSON.stringify(value);
  }
  return defines;
}

/**
 * Serves `src/workers/*.js` at `/workers/*` during development.
 * In production builds these are copied into `dist/workers` by `copy:workers`.
 */
function serveWorkersInDev(): Plugin {
  const workersDir = path.resolve(root, 'src', 'workers');
  return {
    name: 'arcjr:serve-workers',
    apply: 'serve',
    resolveId(id) {
      if (!id.startsWith('/workers/')) return null;
      const file = path.join(workersDir, id.slice('/workers/'.length).split('?')[0] ?? '');
      return file.startsWith(workersDir) && fs.existsSync(file) ? file : null;
    }
  };
}

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      '@': path.resolve(root, 'src'),
      '@public': path.resolve(root, 'public')
    }
  },
  define: defineBrowserEnv(mode),
  publicDir: 'public',
  server: {
    port: 3000,
    open: true
  },
  build: {
    target: 'es2023',
    outDir: 'dist',
    emptyOutDir: false,
    /** Static assets are copied into dist/ by the `copy` scripts after prerendering */
    copyPublicDir: false,
    sourcemap: true,
    /** The prerenderer reads the manifest to discover the hashed entry bundle */
    manifest: true,
    rolldownOptions: {
      input: path.resolve(root, 'src', 'main.tsx'),
      output: {
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        codeSplitting: {
          groups: [
            {
              name: 'react-runtime',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 20
            },
            {
              name: 'vendors',
              test: /[\\/]node_modules[\\/](react-router|@tanstack|@sentry)[\\/]/,
              priority: 10
            }
          ]
        }
      }
    }
  },
  plugins: [
    react(),
    serveWorkersInDev(),
    process.env.ANALYZE
      ? visualizer({ filename: 'dist/stats.html', gzipSize: true, brotliSize: true })
      : null,
    process.env.CI
      ? sentryVitePlugin({
          authToken: process.env.SENTRY_AUTH_TOKEN,
          org: 'nickg',
          project: 'sentry-arc'
        })
      : null
  ]
}));
