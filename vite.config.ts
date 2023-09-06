import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteSingleFile } from "vite-plugin-singlefile";

const root = resolve(__dirname, "src");
const dist = resolve(__dirname, "dist_app");

export default defineConfig({
  plugins: [react(), tsconfigPaths(), viteSingleFile()],
  build: {
    minify: true,
    outDir: dist,
  },
});
