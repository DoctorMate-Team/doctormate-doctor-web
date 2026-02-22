import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist' // خليها dist لأن Vercel متوافق مع dist تلقائي
  }
})