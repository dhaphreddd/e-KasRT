import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Use relative paths so it works on any subdirectory/domain
  build: {
    outDir: 'dist',
  }
});
