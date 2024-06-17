import customRouter from "../customRouter.js";
import  products  from "../../data/mongo/products.mongo.js";

export default class ProductRouter extends customRouter {
  init() {
    this.get("/form", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("form");
      } catch (error) {
        next(error);
      }
    });

    this.get("/:pid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const one = await products.readOne(pid);
        return res.render("detail", { product: one, title: one.title.toUpperCase()});
      } catch (error) {
        next(error);
      }
    });

    this.get("/",["PREM"], async (req,res,next) => {
      try {
        const all = await products.read({ filter: { owner_id: req.user._id } })
        return res.render("products",  { products: all.docs})
      } catch (error) {
        return next(error)
      }
    })
  }
}
