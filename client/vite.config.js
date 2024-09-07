import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      // أضف أي إعدادات alias أخرى هنا إذا لزم الأمر
    },
  },
});