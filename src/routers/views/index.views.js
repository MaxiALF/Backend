import customRouter from "../customRouter.js";
import products from "../../data/mongo/products.mongo.js";
import ProductRouter from "./products.views.js";
import UserRouter from "./users.view.js";
import OrderRouter from "./orders.view.js";

const Order = new OrderRouter();
const Product = new ProductRouter();
const User = new UserRouter();

export default class ViewsRouter extends customRouter {
  init() {
    this.router.use("/products", Product.getRouter());
    this.router.use("/auth", User.getRouter());
    this.router.use("/orders", Order.getRouter());
    this.get("/",["PUBLIC"], async (req, res, next) => {
      try {
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        const sortAndPaginate = {
          limit: req.query.limit || 6,
          page: req.query.page || 1,
          sort: { price: 1 },
        };
        if (req.query.price === "desc") {
          sortAndPaginate.sort.price = -1;
        }
        const isPrem = req.user && req.user.role === 2;
        if (isPrem) {
          const all = await products.read({
            filter: { ...filter, owner_id: { $ne: req.user._id } },
            sortAndPaginate,
          });
          return res.render("index", {
            products: all.docs,
            next: all.nextPage,
            prev: all.prevPage,
            title: "INDEX",
            filter: req.query.title,
          });
        } else {
        const all = await products.read({ filter, sortAndPaginate });
        return res.render("index", {
          products: all.docs,
          next: all.nextPage,
          prev: all.prevPage,
          title: "INDEX",
          filter: req.query.title,
        });
      }
      } catch (error) {
        next(error);
      }
    });
  }
}
