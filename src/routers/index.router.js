import customRouter from "./customRouter.js";
import apiRouter from "./api/index.router.js";
import ViewsRouter from "./views/index.views.js";

const views = new ViewsRouter();
const viewsRouter = views.getRouter();
class IndexRouter extends customRouter {
  init() {
    this.router.use("/api", apiRouter);
    this.router.use("/", viewsRouter);
    this.router.get("/simplex", (req, res, next) => {
      try {
        let total = 1;
        for (let i = 1; i < 100; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });
    this.router.get("/complex", (req, res, next) => {
      try {
        let total = 1;
        for (let i = 1; i < 10000000000; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });
  }
}

const router = new IndexRouter();
export default router.getRouter();
