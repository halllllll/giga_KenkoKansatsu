import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteSingleFile } from "vite-plugin-singlefile";
import { resolve } from "path";

const root = resolve(__dirname, "src");

export default defineConfig({
  plugins: [react(), tsconfigPaths(), viteSingleFile()],
  root,
  build: {
    minify: true,
    outDir: "dist",
    rollupOptions: {
      input: {
        app: resolve(root, "client", "index.html"),
      },
      external: [resolve(root, "client", "API", "stubs")],
    },
  },
});
