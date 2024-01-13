import { Router } from "express";
import products from "../../data/fs/products.fs.js";

const ProdRouter = Router();

ProdRouter.get("/", async (req, res, next) => {
  try {
    const all = await products.read();
    res.render("real", { products: all });
  } catch (error) {
    next(error);
  }
});

export default ProdRouter;