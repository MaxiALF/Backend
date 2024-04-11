import service from "../services/orders.service.js";
import errors from "../utils/errors/errors.js";
import customError from "../utils/errors/customError.js";

class OrdersController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = {
        user_id: req.user._id,
        product_id: req.body.product_id,
      };
      const one = await this.service.create(data);
      return res.success201(one);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const filter = {};
      if (req.query.state) {
        filter.state = new RegExp(req.query.state.trim(), "i");
      }
      const sortAndPaginate = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort: { user_id: 1 },
        lean: true,
      };
      if (req.query.user_id === "desc") {
        sortAndPaginate.sort.user_id = -1;
      }
      const all = await this.service.read({ filter, sortAndPaginate });
      if (!all) {
        return customError.new(errors.notFound);
      } else {
        return res.success200(all);
      }
    } catch (error) {
      next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const one = await this.service.readOne(oid);
      if (!one) {
        return customError.new(errors.notFound);
      } else {
        return res.success200(one);
      }
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const data = req.body;
      const one = await this.service.update(oid, data);
      if (!one) {
        return customError.new(errors.notFound);
      } else {
        return res.success200(one);
      }
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const response = await this.service.destroy(oid);
      if (!response) {
        return customError.new(errors.notFound);
      } else {
        return res.success200(response);
      }
    } catch (error) {
      return next(error);
    }
  };

  report = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const subTotal = await this.service.report(uid);
      return res.success200({ subTotal });
    } catch (error) {
      return next(error);
    }
  };
}

export default OrdersController;
const controller = new OrdersController();
const { create, read, readOne, update, destroy, report } = controller;
export { create, read, readOne, update, destroy, report };
