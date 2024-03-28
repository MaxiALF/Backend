import customRouter from "../customRouter.js";
import propsUsers from "../../middlewares/propsUsers.js";
import {
  create,
  destroy,
  read,
  readOne,
  update,
} from "../../controllers/users.controller.js";

class UsersRouter extends customRouter {
  init() {
    this.post("/", ["PUBLIC"], propsUsers, create);

    this.get("/", ["ADMIN"], read);

    this.get("/:uid", ["USER", "PREM"], readOne);

    this.put("/:uid", ["USER", "PREM"], update);

    this.delete("/:uid", ["USER", "PREM"], destroy);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();