import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
<<<<<<< HEAD
      'process.env.DASHSCOPE_API_KEY': JSON.stringify(env.DASHSCOPE_API_KEY),
      'process.env.DASHSCOPE_BASE_URL': JSON.stringify(env.DASHSCOPE_BASE_URL),
      'process.env.DASHSCOPE_TTS_URL': JSON.stringify(env.DASHSCOPE_TTS_URL),
      'process.env.QWEN_MODEL': JSON.stringify(env.QWEN_MODEL),
=======
      'process.env.GEMINI_API_KEY': 'process.env.GEMINI_API_KEY'
>>>>>>> 69e105540934da18bb60db12ba88d17d35f2b862
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
