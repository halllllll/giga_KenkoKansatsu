import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteSingleFile } from "vite-plugin-singlefile";
import fs from "fs";

const root = resolve(__dirname, "src");
const dist = resolve(__dirname, "dist_app");

const tempPortFilePath =
  process.env.DEV_MOCK_DB_TEMP_PORT_FILE || "temp-port.txt";
const devMockDbPort = fs.existsSync(tempPortFilePath)
  ? fs.readFileSync(tempPortFilePath, "utf-8")
  : process.env.VITE_DEV_MOCK_DB_PORT;

console.info(`db port on vite: ${devMockDbPort}`);
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react(), tsconfigPaths(), viteSingleFile()],
    server: {
      proxy: {
        "/api": {
          target: `http://localhost:${devMockDbPort}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          configure: (proxy, _options) => {
            proxy.on("error", (err, _req, _res) => {
              console.error("proxy error", err);
            });
            proxy.on("proxyReq", (proxyReq, req, _res) => {
              console.log(
                "Sending Request to the Target:",
                req.method,
                req.url
              );
            });
            proxy.on("proxyRes", (proxyRes, req, _res) => {
              console.log(
                "Received Response from the Target:",
                proxyRes.statusCode,
                req.url
              );
            });
          },
        },
      },
    },
    build: {
      minify: true,
      outDir: dist,
    },
  });
};
