import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteSingleFile } from "vite-plugin-singlefile";

const root = resolve(__dirname, "src");
const dist = resolve(__dirname, "dist_app");

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react(), tsconfigPaths(), viteSingleFile()],
    server: {
      proxy: {
        "/api": {
          target: `http://localhost:${process.env.VITE_DEV_MOCK_DB_PORT}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      minify: true,
      outDir: dist,
    },
  });
};
