import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'; // Reactを使用している場合

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/nobin-photorealistic-AI' // リポジトリ名に合わせる
});