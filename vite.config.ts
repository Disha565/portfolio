import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves the site from /<repo>/. Override with BASE_PATH=/ for a custom domain.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/portfolio/',
  plugins: [react(), tailwindcss()],
})
