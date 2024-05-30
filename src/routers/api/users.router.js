import customRouter from "../customRouter.js";
import propsUsers from "../../middlewares/propsUsers.js";
import {
  changeRole,
  create,
  destroy,
  read,
  readOne,
  update,
  fileUpload,
} from "../../controllers/users.controller.js";
import uploader from "../../middlewares/multer.js";

class UsersRouter extends customRouter {
  init() {
    this.post("/", ["PUBLIC"], propsUsers, create);

    this.get("/", ["ADMIN"], read);

    this.get("/:uid", ["USER", "PREM"], readOne);

    this.put("/:uid", ["USER", "PREM"], update);

    this.delete("/:uid", ["PUBLIC"], destroy);

    this.post("/premium/:uid", ["USER", "PREM", "ADMIN"], changeRole);

    this.post(
      "/:uid/documents",
      ["USER", "PREM"],
      uploader.array("documents", 10),
      fileUpload
    );
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
