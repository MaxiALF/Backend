import customRouter from "../customRouter.js";
import { users } from "../../data/mongo/manager.mongo.js";
import propsUsers from "../../middlewares/propsUsers.js";

export default class UsersRouter extends customRouter {
  init() {
    this.post("/", ["ADMIN", "PREM"], propsUsers, async (req, res, next) => {
      try {
        const data = req.body;
        const response = await users.create(data);
        return res.success201(response);
      } catch (error) {
        next(error);
      }
    });

    this.get("/", ["PUBLIC"], async (req, res, next) => {
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
        const all = await users.read({ filter, sortAndPaginate });
        return res.success200(all);
      } catch (error) {
        next(error);
      }
    });

    this.get("/:uid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const one = await users.readOne(uid);
        return res.success200(one);
      } catch (error) {
        next(error);
      }
    });

    this.put("/:uid", ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const data = req.body;
        const one = await users.update(uid, data);
        return res.success200(one);
      } catch (error) {
        next(error);
      }
    });

    this.delete("/:uid", ["ADMIN", "PREM"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const one = await users.destroy(uid);
        return res.success200(one);
      } catch (error) {
        next(error);
      }
    });
  }
}
