import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js"
import propsProducts from "../../middlewares/propsProducts.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import passport from "../../middlewares/passport.mid.js"

const productsRouter = Router(); 

productsRouter.post("/", passport.authenticate("jwt", { session: false }), isAdmin, propsProducts, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await products.create(data);
    return res.json({
      statusCode: 201,
      response,
      message: "product created!",
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i" );
    }
    const sortAndPaginate = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: { price: 1 },
    };
    if (req.query.price === "desc") {
      sortAndPaginate.sort.price = -1;
    }
    const all = await products.read({ filter, sortAndPaginate });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const response = await products.update(pid, data);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await products.destroy(pid);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
