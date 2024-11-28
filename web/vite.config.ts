import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '') 

  return defineConfig({
    server: {
      port: 80,
      host: '0.0.0.0'
    },
    plugins: [react()],
    css: {
      postcss: './postcss.config.ts',
    },
    envDir: process.cwd(), 
    define: {
      'process.env': env,
    },
  })
}
