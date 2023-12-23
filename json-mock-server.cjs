const fs = require("fs");
// const dotenv = require("dotenv");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("mock-db.json");
const middlewares = jsonServer.defaults();
// dotenv.config();

const tempPortFilePath =
  process.env.DEV_MOCK_DB_TEMP_PORT_FILE ?? "temp-port.txt";
let port =
  Number(
    fs.existsSync(tempPortFilePath)
      ? fs.readFileSync(tempPortFilePath, "utf-8")
      : process.env.VITE_DEV_MOCK_DB_PORT
  ) ?? 8040;

server.use(middlewares);
server.use(router);
server.use(jsonServer.bodyParser);

// server.get("/inquiries", (req: any, res: any, next: () => void) => {
//   console.log(req);
//   next();
// });

function startServer(port) {
  server
    .listen(port, () => {
      console.log(`json-server is running on port ${port}`);
      fs.writeFileSync(tempPortFilePath, port.toString());
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(`Port ${port} is in use, trying another port.`);
        startServer(port + 1);
      } else {
        console.error(err);
      }
    })
}

startServer(port)

// 正常終了時に起動ポート番号一時ファイル消去
process.on("exit", () => {
  if (fs.existsSync(tempPortFilePath)) {
    fs.unlinkSync(tempPortFilePath);
  }
});

// 異常終了時も
process.on("SIGINT", () => {
  if (fs.existsSync(tempPortFilePath)) {
    fs.unlinkSync(tempPortFilePath);
  }
  process.exit();
});
