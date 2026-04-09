import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) {
              return undefined;
            }

            if (id.includes('firebase')) {
              return 'firebase';
            }

            if (id.includes('@google/genai')) {
              return 'genai';
            }

            if (id.includes('recharts')) {
              return 'charts';
            }

            if (id.includes('katex') || id.includes('react-katex')) {
              return 'math';
            }

            if (id.includes('prismjs')) {
              return 'prism';
            }

            if (
              id.includes('react-router') ||
              id.includes('/react/') ||
              id.includes('react-dom') ||
              id.includes('scheduler')
            ) {
              return 'react-vendor';
            }

            return 'vendor';
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    ssr: {
      noExternal: ['prismjs', 'react-helmet-async', 'recharts', 'react-katex'],
    },
  };
});
