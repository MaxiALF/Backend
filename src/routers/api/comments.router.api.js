import customRouter from "../customRouter.js";
import {
  create,
  destroy,
  read,
  readOne,
  update,
} from "../../controllers/comments.controller.js";

class CommentsRouter extends customRouter {
  init() {
    this.post("/", ["USER", "PREM"], create);
    this.get("/", ["PUBLIC"], read);
    this.get("/:cid", ["PUBLIC"], readOne);
    this.put("/:cid", ["USER", "PREM"], update);
    this.delete("/:cid", ["USER", "PREM"], destroy);
  }
}

const commentsRouter = new CommentsRouter();
export default commentsRouter.getRouter();
