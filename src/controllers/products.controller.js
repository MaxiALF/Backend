import service from "../services/products.service.js";
import errors from "../utils/errors/errors.js";
import customError from "../utils/errors/customError.js";

class ProductsController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const ownerId = req.user._id;
      const data = { ...req.body, owner_id: ownerId };
      const response = await this.service.create(data);
      return res.status(201).success201(response);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const filter = {};
      if (req.query.title) {
        filter.title = new RegExp(req.query.title.trim(), "i");
      }
      const sortAndPaginate = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort: { title: 1 },
        lean: true,
      };
      if (req.query.price === "desc") {
        sortAndPaginate.sort.price = -1;
      }
      const isPrem = req.user && req.user.role === 2;
      if (isPrem) {
        const all = await this.service.read({
          filter: { ...filter, owner_id: { $ne: req.user._id } },
          sortAndPaginate,
        });
        if (!all) {
          return customError.new(errors.notFound);
        } else {
          return res.success200(all);
        }
      } else {
        const all = await this.service.read({ filter, sortAndPaginate });
        if (!all) {
          return customError.new(errors.notFound);
        } else {
          return res.success200(all);
        }
      }
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const one = await this.service.readOne(pid);
      if (!one) {
        return res.status(404).errors.notFound;
      } else {
        return res.success200(one);
      }
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const data = req.body;
      const response = await this.service.update(pid, data);
      if (!response) {
        return customError.new(errors.notFound);
      } else {
        return res.success200(response);
      }
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const response = await this.service.destroy(pid);
      if (!response) {
        return customError.new(errors.notFound);
      } else {
        return res.success200(response);
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default ProductsController;

const controller = new ProductsController();
const { create, read, readOne, update, destroy } = controller;

export { create, read, readOne, update, destroy };
