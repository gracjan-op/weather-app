import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vercel()],
  build: {
    outDir: 'dist/client',
  },
});
