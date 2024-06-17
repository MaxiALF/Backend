import customRouter from "../customRouter.js";
import { checkout } from "../../controllers/payments.controller.js";

class paymentsRouter extends customRouter {
  init() {
    this.post("/checkout", ["USER", "PREM"], checkout);
  }
}

const PaymentsRouter = new paymentsRouter();
export default PaymentsRouter.getRouter(); 