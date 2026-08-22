import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/api/v1": {
        target: "http://66.29.151.40:6060",
        changeOrigin: true,
      },
      "/media": {
        target: "http://66.29.151.40:6060",
        changeOrigin: true,
      },
    },
  },
});