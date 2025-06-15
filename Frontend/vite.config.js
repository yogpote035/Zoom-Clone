import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: mode === 'development' ? {
    host: '0.0.0.0',  // Accessible from other devices in same Wi-Fi
    port: 5173        // Use fixed port for predictability
  } : undefined       // Do NOT expose anything in production
}));
