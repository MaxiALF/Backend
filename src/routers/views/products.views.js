import customRouter from "../customRouter.js";
import  products  from "../../data/mongo/products.mongo.js";

export default class ProductRouter extends customRouter {
  init() {
    this.get("/real", ["PUBLIC"], async (req, res, next) => {
      try {
        const all = await products.read();
        return res.render("real", { products: all });
      } catch (error) {
        next(error);
      }
    });

    this.get("/form", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("form");
      } catch (error) {
        next(error);
      }
    });
  }
}
