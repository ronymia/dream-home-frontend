import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components/*": path.resolve(__dirname, "./src/components/*"),
      "@app/*": path.resolve(__dirname, "./src/app/*"),
      "@services/*": path.resolve(__dirname, "./src/services/*"),
      "@features/*": path.resolve(__dirname, "./src/features/*"),
    },
  },
});
