import service from "../services/comments.service.js";
import customError from "../utils/errors/customError.js";
import errors from "../utils/errors/errors.js";

class CommentsController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.user_id = req.user._id;
      const one = await this.service.create(data);
      return res.success201(one);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const filter = { user_id: req.user._id };
      const sortAndPaginate = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
      };
      const all = await this.service.read({ filter, sortAndPaginate });
      if (all.docs.length > 0) {
        return res.success200(all);
      } else {
        customError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const one = await this.service.readOne(cid);
      if (!one) {
        return customError.new(errors.notFound)
      } else {
        return res.success200(one);
      }
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const data = req.body;
      const one = await this.service.update(cid, data);
      if (!one) {
        return customError.new(errors.notFound)
      } else {
        return res.success200(one);
      }
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const one = await this.service.destroy(cid);
      if (!one) {
        return customError.new(errors.notFound)
      } else {
        return res.success200(one);
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default CommentsController;
const controller = new CommentsController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };
