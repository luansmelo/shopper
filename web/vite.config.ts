import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, path.resolve(__dirname, '..'), '') 

  return defineConfig({
    server: {
      port: 80,
      host: '0.0.0.0'
    },
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
