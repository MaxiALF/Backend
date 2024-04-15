import { socketServer } from "../../server.js";
import products from "../data/fs/products.fs.js";
import logger from "./logger/index.js";

const messages = [];

export default (socket) => {
  logger.INFO("client " + socket.id + " connected");
  socket.emit("products", products.read());
  socket.on("new product", async (data) => {
    try {
      await products.create(data);
      socketServer.emit("products", products.read());
    } catch (error) {
      logger.WARN(error);
    }
  });
  socket.on("user", () => {
    socket.emit("all", messages);
  });
  socket.emit("messages", messages);
  socket.on("new chat", (data) => {
    messages.push(data);
    socketServer.emit("all", messages);
  });
};
