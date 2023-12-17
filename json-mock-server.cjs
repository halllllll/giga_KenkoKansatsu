const dotenv = require("dotenv");
dotenv.config();
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("mock-db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.use(jsonServer.bodyParser);

// server.get("/inquiries", (req: any, res: any, next: () => void) => {
//   console.log("wow!");
//   console.log(req);
//   next();
// });

server.listen(process.env.VITE_DEV_MOCK_DB_PORT, () => {
  console.log("JSON Server is running");
});
