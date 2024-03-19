import env from "./src/utils/env.util.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import cors from "cors";
import args from "./src/utils/args.util.js";
import MongoStore from "connect-mongo";

import router from "./src/routers/index.router.js";

import errorHandler from "./src/middlewares/errorHandler.js"
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";
import socketUtils from "./src/utils/socket.utils.js";
import dbConnection from "./src/utils/db.js";

const server = express();
const PORT = process.env.PORT || 8080;
const ready = () => {
  console.log("Server ready in port " + PORT);
  dbConnection();
  console.log("Mode " + args.env + " online");
};
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", socketUtils);

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

const fileStore = sessionFileStore(expressSession);

server.use(cookieParser(process.env.PASS_KEY));

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

server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

export { socketServer };