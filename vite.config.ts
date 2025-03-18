
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "ui",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: false,
    // Add target for older Node versions
    target: "es2015",
    rollupOptions: {
      // Ensure correct paths for FiveM NUI
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Override the engine check for Node.js version
  optimizeDeps: {
    force: true
  }
}));
