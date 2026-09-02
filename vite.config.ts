import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: 'src/main.jsx',
      name: 'SnipetWidget',
      formats: ['iife'],
      fileName: () => 'snipet-widget.js',
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  server: {
    port: 3001,
  }
})
