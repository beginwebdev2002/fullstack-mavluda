import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig(({ mode }) => ({
  plugins: [angular()],
  test: {
    globals: true,
    setupFiles: ['src/test-setup.ts'],
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  resolve: {
    alias: {
      '@app': '/src/app',
      '@pages': '/src/pages',
      '@backend': '/src/backend',
      '@entities': '/src/entities',
      '@features': '/src/features',
      '@locale': '/src/locale',
      '@shared': '/src/shared',
      '@types': '/src/types',
      '@widgets': '/src/widgets',
      '@environments': '/src/environments',
      '@src': '/src',
      '@core': '/src/core'
    },
  },
}));
