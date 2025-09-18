import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    proxy: {
      // Tudo que começa com /api vai para o backend Express na 4000
      '/api': {
        target: 'http://localhost:80',
        changeOrigin: true,
      },
    },
  },
});
