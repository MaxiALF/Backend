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
    this.post("/", ["ADMIN", "PREM"], propsUsers, create);

    this.get("/", ["PUBLIC"], read);

    this.get("/:uid", ["PUBLIC"], readOne);

    this.put("/:uid", ["ADMIN", "PREM"], update);

    this.delete("/:uid", ["ADMIN", "PREM"], destroy);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();