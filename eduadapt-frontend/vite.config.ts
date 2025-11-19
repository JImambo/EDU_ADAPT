import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ajoutez cette section pour MUI
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    // Cette ligne est la plus importante
    jsxInject: `import React from 'react'`,
  },
  optimizeDeps: {
    include: ['@mui/material/Unstable_Grid2'], // Optimisation pour le Grid2 de MUI
  },
})
