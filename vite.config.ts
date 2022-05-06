import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path-browserify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  },
  base: './',
  build: {
    outDir: 'docs',
    sourcemap: true
  }
})
