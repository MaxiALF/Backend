import service from "../services/users.service.js";
import errors from "../utils/errors/errors.js";
import customError from "../utils/errors/customError.js";
import users from "../data/mongo/users.mongo.js";

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

  changeRole = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const user = await users.readOne(uid);
      const newRole = user.role === 0 ? 2 : 0;
      const one = await this.service.update(
        uid,
        { role: newRole },
        { new: true }
      );
      if (!one) {
        return customError.new(errors.notFound);
      } else {
        return res.success200("Role Changed!");
      }
    } catch (error) {
      return next(error);
    }
  };

  fileUpload = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).error400({ message: "No files uploaded" });
      }
      const user = await users.findById(uid);
      if (!user) {
        return res.status(404).error404({ message: "User not found" });
      }
      files.forEach((file) => {
        user.documents.push({ name: file.originalname, reference: file.path });
      });
      await user.save();
      res
        .status(200)
        .success200({
          message: "Documents uploaded successfully",
          documents: user.documents,
        });
    } catch (error) {
      return next(error);
    }
  };
}

export default UsersController;
const controller = new UsersController();
const { create, read, readOne, update, destroy, changeRole, fileUpload } = controller;
export { create, read, readOne, update, destroy, changeRole, fileUpload };
