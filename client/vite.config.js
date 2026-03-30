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
        // Ubah dari OBJEK { ... } menjadi FUNGSI di bawah ini:
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Memisahkan library React core
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor";
            }
            // Memisahkan Framer Motion untuk animasi
            if (id.includes("framer-motion")) {
              return "animations";
            }
            // Sisanya masuk ke chunk 'vendor-others'
            return "vendor-others";
          }
        },
      },
    },
  },
});
