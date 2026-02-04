import { createRequire } from 'module'; // <- добавляем
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
const require = createRequire(import.meta.url);

const { alias } = require('./aliases.cjs'); // <- корректный импорт CommonJS
// import { alias } from './aliases.cjs';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg'
    })
  ],
  css: {
    modules: {
      localsConvention: 'camelCase' // Чтобы обращаться как styles.myClass даже если в SCSS дефис
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/app/styles/variables.scss";
        @import "@/app/styles/fonts.scss";` // подставляет переменные из этого файла во все scss-файлы
      }
    }
  },
  resolve: {
    alias
  },
  server: {
    port: 4000,
    open: true
  }
});
