import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js"; 
import productsRouter from "./products.views.js";
import usersRouter from "./users.view.js";
import ordersRouter from "./orders.view.js";


const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i" );
    }
    const sortAndPaginate = {
      limit: req.query.limit || 6,
      page: req.query.page || 1,
      sort: { price: 1 },
    };
    if (req.query.price === "desc") {
      sortAndPaginate.sort.price = -1;
    }
    const all = await products.read({ filter, sortAndPaginate });
    return res.render("index", {
      products: all.docs,
      next: all.nextPage,
      prev: all.prevPage,
      title: "INDEX",
      filter: req.query.title,
    });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/auth", usersRouter);
viewsRouter.use("/orders", ordersRouter);

export default viewsRouter; 
