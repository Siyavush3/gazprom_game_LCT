import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true, // если порт занят — ошибка, а не выбор другого
    host: true,       // чтобы можно было открыть по IP (полезно для теста на телефоне)
  },
});
