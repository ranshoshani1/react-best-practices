import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import rawLoader from "vite-raw-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    rawLoader({
      fileRegex: /\.md$/,
    }),
  ],
  assetsInclude: ["**/*.jsx"],
});
