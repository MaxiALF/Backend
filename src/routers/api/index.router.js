import { Router } from "express";
import productsRouter from "./products.router.js"; 
import usersRouter from "./users.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./sessions.router.api.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", passCallBackMid("jwt"), ordersRouter);
apiRouter.use("/sessions", sessionsRouter);

export default apiRouter;
