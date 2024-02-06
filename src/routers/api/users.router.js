import { Router } from "express";
// import users from "../../data/fs/users.fs.js";
import { users } from "../../data/mongo/manager.mongo.js";
import propsUsers from "../../middlewares/propsUsers.js";

const usersRouter = Router();

usersRouter.post("/", propsUsers, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await users.create(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
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
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await users.readOne(uid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const one = await users.update(uid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await users.destroy(uid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
