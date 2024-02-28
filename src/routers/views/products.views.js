import { Router } from "express";
import { products } from "../../data/mongo/manager.mongo.js";

const productsRouter = Router();

productsRouter.get("/real", async (req, res, next) => {
  try {
    const all = await products.read();
    return res.render("real", { products: all });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/form", async (req, res, next) => {
  try {
    return res.render("form");
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
