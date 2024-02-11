import { Router } from "express";
import products from "../../data/fs/products.fs.js";

const ProdRouter = Router();

ProdRouter.get("/real", async (req, res, next) => {
  try {
    const all = await products.read();
    return res.render("real", { products: all });
  } catch (error) {
    next(error);
  }
});

ProdRouter.get("/form", async (req, res, next) => {
  try {
    return res.render("form");
  } catch (error) {
    next(error);
  }
});

export default ProdRouter;
