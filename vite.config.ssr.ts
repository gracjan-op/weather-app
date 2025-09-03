import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
    }),
  ],
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'dist/server',
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-dev-runtime'],
      output: {
        format: 'esm',
        entryFileNames: 'entry-server.js',
      },
    },
    minify: false,
    sourcemap: false,
  },
  define: {
    'process.env.NODE_ENV': '"production"',
    __DEV__: false,
    'import.meta.env.DEV': false,
    'import.meta.env.PROD': true,
  },
  mode: 'production',
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
    jsxDev: false,
  },
  optimizeDeps: {
    exclude: ['react/jsx-dev-runtime'],
  },
});
