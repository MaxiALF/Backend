import customRouter from "../customRouter.js";
import propsProducts from "../../middlewares/propsProducts.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import {
  create,
  destroy,
  read,
  readOne,
  update,
} from "../../controllers/products.controller.js";

class ProductsRouter extends customRouter {
  init() {
    this.post(
      "/",
      ["ADMIN", "PREM"],
      passCallBackMid("jwt"),
      propsProducts,
      create
    );
    this.get("/", ["PUBLIC"], read);
    this.get("/:pid", ["PUBLIC"], readOne);
    this.put("/:pid", ["ADMIN", "PREM"], update);
    this.delete("/:pid", ["ADMIN", "PREM"], destroy);
  }
}

const productsRouter = new ProductsRouter()
export default productsRouter.getRouter()