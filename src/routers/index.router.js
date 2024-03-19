import customRouter from "./customRouter.js";
import apiRouter from "./api/index.router.js";
import ViewsRouter from "./views/index.views.js";

const views = new ViewsRouter();
const viewsRouter = views.getRouter();
class IndexRouter extends customRouter {
  init() {
    this.router.use("/api", apiRouter);
    this.router.use("/", viewsRouter);
  }
}

const router = new IndexRouter();
export default router.getRouter();
