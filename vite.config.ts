import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/main.jsx',
      name: 'SnipetWidget',
      formats: ['iife'],
      fileName: () => 'snipet-widget.js',
    },
  },
})
