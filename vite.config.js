import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Ensures the app is accessible externally
    port: mode === 'development' ? 3000 : undefined, // Use default port for production
    cors: true, // Enable CORS for external API calls during development
  },
  build: {
    // Explicitly define the output directory
    outDir: 'dist',

    // Enable manual chunks to split large libraries into separate files
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules into a separate chunk to reduce the main file size
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },

    // Increase chunk size limit to avoid warnings for large bundles
    chunkSizeWarningLimit: 1500, // Default is 500 KB, increase to avoid warnings

    // Optimize asset handling
    assetsInlineLimit: 4096, // Inline assets smaller than 4KB into the build

    // Enable source maps for easier debugging during development
    sourcemap: mode === 'development',
  },
}));
