import customRouter from "./customRouter.js";
import ApiRouter from "./api/index.router.js";
import ViewsRouter from "./views/index.views.js"

const api = new ApiRouter()
const views = new ViewsRouter()

export default class IndexRouter extends customRouter {
    init() {
        this.router.use("/api",api.getRouter())
        this.router.use("/", views.getRouter())
    }
}
