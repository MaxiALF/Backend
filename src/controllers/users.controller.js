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
      const { role } = req.body;
      const user = await users.readOne(uid);
      if (role === 2) {
        const requiredDocs = ["identification", "adress", "account status"];
        const userDocs = user.documents.map((doc) =>
          doc.name.toLowerCase().replace(".txt", "")
        );
        const hasAllDocs = requiredDocs.every((doc) => userDocs.includes(doc));
        if (!hasAllDocs) {
          return res
            .status(400)
            .json({ message: "User has not uploaded all required documents" });
        }
      }
      const one = await this.service.update(uid, { role });
      if (!one) {
        return customError.new(errors.notFound);
      } else {
        return res.success200("Role Changed!");
      }
    } catch (error) {
      return next(error);
    }
  };

  uploadFiles = async (req, res, next) => {
    try {
      const user = req.params.uid;
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }
      const documents = files.map((file) => ({
        name: file.originalname,
        reference: file.path,
      }));
      await users.update(user, { $push: { documents: { $each: documents } } });
      res
        .status(200)
        .json({ message: "Documents uploaded successfully", documents });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
const controller = new UsersController();
const { create, read, readOne, update, destroy, changeRole, uploadFiles } =
  controller;
export { create, read, readOne, update, destroy, changeRole, uploadFiles };
