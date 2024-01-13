import { Router } from "express";
import products from "../../data/fs/products.fs.js";
import ProdRouter from "./products.views.js";
import usersRouter from "./users.view.js";
import formRouter from "./form.view.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    const mainProd = products.read();
    res.render("index", { prod: mainProd });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/real", ProdRouter);
viewsRouter.use("/form", formRouter);
viewsRouter.use("/register", usersRouter);

export default viewsRouter;
