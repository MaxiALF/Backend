import customRouter from "../customRouter.js";
import { report } from "../../controllers/orders.controller.js";

class TicketsRouter extends customRouter {
  init() {
    this.get("/total/:uid", ["USER", "PREM"], report);
  }
}

const ticketsRouter = new TicketsRouter();
export default ticketsRouter.getRouter();
