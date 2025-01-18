import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Ensures it uses port 5173
    open: true, // Optional: Opens the app in your browser
  },
  build: {
    outDir: 'build', // Optional: Ensures output goes to the 'build' directory
  },
  resolve: {
    alias: {
      '@': '/src', // Optional: Makes aliasing cleaner
    },
  },
});
