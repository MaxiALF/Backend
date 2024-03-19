import customRouter from "../customRouter.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import {
  create,
  destroy,
  read,
  readOne,
  report,
  update,
} from "../../controllers/orders.controller.js";

class OrdersRouter extends customRouter {
  init() {
    this.post("/", ["USER", "PREM"], passCallBack("jwt"), create);
    this.get("/total/:uid", ["USER"], report);
    this.get("/", ["ADMIN", "PREM", "USER"], read);
    this.get("/:oid", ["ADMIN", "PREM", "USER"], readOne);
    this.put("/:oid", ["USER"], update);
    this.delete("/:oid", ["USER"], destroy);
  }
}

const ordersRouter = new OrdersRouter()
export default ordersRouter.getRouter()