import env from "./src/utils/env.util.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import cors from "cors";
import compression from "express-compression";
// import cluster from "cluster";              
// import { cpus } from "os";
import args from "./src/utils/args.util.js";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";
import options from "./src/utils/swagger.js";
import socketUtils from "./src/utils/socket.utils.js";
import winston from "./src/middlewares/winston.js";
import logger from "./src/utils/logger/index.js";

const server = express();
const PORT = env.PORT || 8080;
const ready = () => {
  logger.INFO("Server ready in port " + PORT);
  logger.INFO("Mode " + args.env + " online");
};
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", socketUtils);

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

const fileStore = sessionFileStore(expressSession);

server.use(cookieParser(env.PASS_KEY));

// server.use(
//   expressSession({
//     secret: process.env.PASS_KEY,
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 },
//   })
// );

// server.use(
//   expressSession({
//     secret: process.env.PASS_KEY,
//     resave: true,
//     saveUninitialized: true,
//     store: new fileStore({
//       path: "./src/data/fs/files/sessions",
//       ttl: 10,
//       retries: 3,
//     }),
//   })
// );

// server.use(
//   expressSession({
//     secret: process.env.PASS_KEY,
//     resave: true,
//     saveUninitialized: true,
//     store: new MongoStore({
//       ttl: 7 * 24 * 60 * 60,
//       mongoUrl: process.env.MONGO_DB_LINK,
//     }),
//   })
// );

const specifications = swaggerJSDoc(options);
server.use("/api/docs", serve, setup(specifications));
server.use(
  cors({
    origin: true,
    credentials: true, 
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));
server.use(winston);
server.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

// logger.INFO(cluster.isPrimary);
// if (cluster.isPrimary) {
//   logger.INFO("PRIMARY ID :" + process.pid);
//   const numberOfProcess = cpus().length;
//   logger.INFO("NUMBER OF PROCESS OF MY COMPUTER: " + numberOfProcess);
//   cluster.fork();
// } else {
//   logger.INFO("WORKER ID: " + process.pid);
//   server.listen(PORT, ready);
// }

export { socketServer };
