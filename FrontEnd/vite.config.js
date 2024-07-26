/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'FrontEnd',  // Asegúrate de que 'dist' sea el directorio de salida correcto
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './index.html')
      }
    }
  },
  server: {
    open: true,
    host: true,
    port: 3000
  }
});
