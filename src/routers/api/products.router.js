import customRouter from "../customRouter.js";
import { products } from "../../data/mongo/manager.mongo.js";
import propsProducts from "../../middlewares/propsProducts.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
 
export default class ProductsRouter extends customRouter {
  init() {
    this.post(
      "/",
      ["ADMIN", "PREM"],
      passCallBackMid("jwt"),
      isAdmin,
      propsProducts,
      async (req, res, next) => {
        try {
          const data = req.body;
          const response = await products.create(data);
          return res.success201(response);
        } catch (error) {
          return next(error);
        }
      }
    );

    this.get("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        const sortAndPaginate = {
          limit: req.query.limit || 10,
          page: req.query.page || 1,
          sort: { price: 1 },
          lean: true,
        };
        if (req.query.price === "desc") {
          sortAndPaginate.sort.price = -1;
        }
        const all = await products.read({ filter, sortAndPaginate });
        return res.success200(all);
      } catch (error) {
        return next(error);
      }
    });

    this.get("/:pid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const one = await products.readOne(pid);
        return res.success200(one);
      } catch (error) {
        return next(error);
      }
    });

    this.put("/:pid", ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const data = req.body;
        const response = await products.update(pid, data);
        return success200(response);
      } catch (error) {
        return next(error);
      }
    });

    this.delete("/:pid", ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const response = await products.destroy(pid);
        return success200(response);
      } catch (error) {
        return next(error);
      }
    });
  }
}
