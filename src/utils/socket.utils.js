import { socketServer } from "../../server.js";
import products from "../data/fs/products.fs.js";

const messages = [];

export default (socket) => {
  console.log("client " + socket.id + " connected");
  socket.emit("products", products.read());
  socket.on("new product", async (data) => {
    try {
      await products.create(data);
      socketServer.emit("products", products.read());
    } catch (error) {
      console.log(error);
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
