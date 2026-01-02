import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const APP_PORT = parseInt(process.env.VITE_PORT || '3300', 10);

export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'automatic' }),
    federation({
      name: 'hello_world',
      filename: 'remoteEntry.js',
      exposes: {
        './PublicHome': './src/dashboards/PublicHome.tsx',
        './MemberHome': './src/dashboards/MemberHome.tsx',
        './CommissionerHome': './src/dashboards/CommissionerHome.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: APP_PORT,
    strictPort: true,
    host: 'localhost',
    cors: true,
  },
  build: {
    target: 'ES2022',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'esm',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
