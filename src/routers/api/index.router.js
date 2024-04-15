import customRouter from "../customRouter.js";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./sessions.router.api.js";
import commentsRouter from "./comments.router.api.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import logger from "../../utils/logger/index.js";

class ApiRouter extends customRouter {
  init() {
    this.use("/users", usersRouter);
    this.use("/products", productsRouter);
    this.use("/orders", passCallBackMid("jwt"), ordersRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/comments", commentsRouter);
    this.get("/loggers", ["PUBLIC"], async (req, res, next) => {
      try {
        logger.HTTP("Hyper text menssage");
        logger.INFO("Informative menssage");
        logger.ERROR("Error menssage");
        logger.FATAL("Fatal menssage");
        res.success200("Loggers successful test");
      } catch (error) {
        return next(error);
      }
    });
  }
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();
