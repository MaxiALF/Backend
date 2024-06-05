import customRouter from "../customRouter.js";
import propsUsers from "../../middlewares/propsUsers.js";
import {
  changeRole,
  create,
  destroy,
  read,
  readOne,
  update,
  uploadFiles,
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
      ["USER", "PREM", "ADMIN"],
      uploader.array('document', 10),
      uploadFiles
    );


    this.post(
      '/:uid/profile',
      ["USER", "PREM", "ADMIN"],
      uploader.single('profile'),
      uploadFiles
    ); 
    
    this.post(
      '/:uid/product',
      ["USER", "PREM", "ADMIN"],
      uploader.single('product'),
      uploadFiles
    );
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
