import { Router } from "express";
import products from "../../data/fs/products.fs.js";
import ProdRouter from "./products.views.js";
import usersRouter from "./users.view.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    const mainProd = products.read();
    res.render("index", { prod: mainProd });
  } catch (error) {
    next(error);
  }
}); 

viewsRouter.use("/products", ProdRouter);
viewsRouter.use("/auth", usersRouter);

export default viewsRouter; 
