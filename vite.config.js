import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    // host: "10.10.7.14",
    host: "31.97.114.108",
    port: 3003,
  },
});
