import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, path.resolve(__dirname, '..'), '') 

  return defineConfig({
    plugins: [react()],
    css: {
      postcss: './postcss.config.ts',
    },
    envDir: path.resolve(__dirname, '..'), 
    define: {
      'process.env': env,
    },
  })
}
