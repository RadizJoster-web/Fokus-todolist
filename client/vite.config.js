import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        // Mengatur format penamaan file agar lebih rapi di folder dist
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",

        manualChunks: {
          vendor: ["react", "react-dom"],
          // Tambahkan lucide-react jika kamu pakai untuk icon di Todo List
          // ui: ["lucide-react"],
          animations: ["framer-motion"],
        },
      },
    },
  },
});
