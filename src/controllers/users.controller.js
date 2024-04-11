import service from "../services/users.service.js";
import errors from "../utils/errors/errors.js";
import customError from "../utils/errors/customError.js";

class UsersController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      return res.success201(response);
    } catch (error) {
      next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const filter = {};
      if (req.query.email) {
        filter.email = new RegExp(req.query.email.trim(), "i");
      }
      const sortAndPaginate = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort: { name: 1 },
      };
      if (req.query.name === "desc") {
        sortAndPaginate.sort.name = -1;
      }
      const all = await this.service.read({ filter, sortAndPaginate });
      if (all.docs.length > 0) {
        return res.success200(all);
      } else {
        customError.new(errors.notFound);
      }
    } catch (error) {
      next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const one = await this.service.readOne(uid);
      if (!one) {
        return customError.new(errors.notFound);
      } else {
        return res.success200(one);
      }
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const data = req.body;
      const one = await this.service.update(uid, data);
      if (!one) {
        return customError.new(errors.notFound);
      } else {
        return res.success200(one);
      }
    } catch (error) {
      next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const one = await this.service.destroy(uid);
      if (!one) {
        return customError.new(errors.notFound);
      } else {
        return res.success200(one);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
const controller = new UsersController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };
