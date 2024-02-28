import { Router } from "express";
import { orders } from "../../data/mongo/manager.mongo.js";
import passCallBack from "../../middlewares/passCallBack.mid.js"

const ordersRouter = Router();

ordersRouter.post("/",passCallBack("jwt"), async (req, res, next) => {
  try {
    const data = {
      user_id: req.user._id,
      product_id: req.body.product_id,
    };
    const one = await orders.create(data);
    return res.json({
      statusCode: 201,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/total/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const subTotal = await orders.report(uid);
    return res.json({
      statusCode: 200,
      response: subTotal,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.state) {
      filter.state = new RegExp(req.query.state.trim(), "i");
    }
    const sortAndPaginate = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: {user_id: 1 }
    };
    if (req.query.user_id === "desc") {
      sortAndPaginate.sort.user_id = -1;
    }
    const all = await orders.read({ filter, sortAndPaginate });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const one = await orders.readOne(oid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const data = req.body;
    const one = await orders.update(oid, data);
    return res.json({
      statusCode: 200,
      messasge: "updated!"
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const response = await orders.destroy(oid);
    return res.json({
      statusCode: 200,
      message: "Deleted!"
    });
  } catch (error) {
    return next(error);
  }
});

export default ordersRouter;
