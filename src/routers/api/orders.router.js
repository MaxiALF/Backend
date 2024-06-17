import customRouter from "../customRouter.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import {
  create,
  destroy,
  read,
  readOne,
  update,
} from "../../controllers/orders.controller.js";

class OrdersRouter extends customRouter {
  init() {
    this.post("/", ["USER", "PREM"], passCallBack("jwt"), create);
    this.get("/", ["PREM", "USER"], read);
    this.get("/:oid", ["PREM", "USER"], readOne);
    this.put("/:oid", ["USER", "PREM"], update);
    this.delete("/:oid", ["USER", "PREM"], destroy);
  }
}

const ordersRouter = new OrdersRouter()
export default ordersRouter.getRouter()