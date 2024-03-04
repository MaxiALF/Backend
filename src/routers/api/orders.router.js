import customRouter from "../customRouter.js";
import { orders } from "../../data/mongo/manager.mongo.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";

export default class OrdersRouter extends customRouter {
  init() {
    this.post("/", ["USER", "PREM"], passCallBack("jwt"), async (req, res, next) => {
      try {
        const data = {
          user_id: req.user._id,
          product_id: req.body.product_id,
        };
        const one = await orders.create(data);
        return res.success201(one)
      } catch (error) {
        return next(error);
      }
    });

    this.get("/total/:uid", ["USER"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const subTotal = await orders.report(uid);
        return res.success200(subTotal);
      } catch (error) {
        return next(error);
      }
    });

    this.get("/", ["ADMIN", "PREM", "USER"], async (req, res, next) => {
      try {
        const filter = {};
        if (req.query.state) {
          filter.state = new RegExp(req.query.state.trim(), "i");
        }
        const sortAndPaginate = {
          limit: req.query.limit || 10,
          page: req.query.page || 1,
          sort: { user_id: 1 },
          lean:true
        };
        if (req.query.user_id === "desc") {
          sortAndPaginate.sort.user_id = -1;
        }
        const all = await orders.read({ filter, sortAndPaginate });
        return res.success200(all)
      } catch (error) {
        next(error);
      }
    });

    this.get("/:oid",  ["ADMIN", "PREM", "USER"], async (req, res, next) => {
      try {
        const { oid } = req.params;
        const one = await orders.readOne(oid);
        return res.success200(one)
      } catch (error) {
        return next(error);
      }
    });

    this.put("/:oid", ["USER"], async (req, res, next) => {
      try {
        const { oid } = req.params;
        const data = req.body;
        const one = await orders.update(oid, data);
        return res.success200(one)
      } catch (error) {
        return next(error);
      }
    });

    this.delete("/:oid", ["USER"], async (req, res, next) => {
      try {
        const { oid } = req.params;
        const response = await orders.destroy(oid);
        return res.success200(response)
      } catch (error) {
        return next(error);
      }
    });
  }
}
