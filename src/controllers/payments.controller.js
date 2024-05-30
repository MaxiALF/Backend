import service from "../services/payments.service.js";

class PaymentsController {
  constructor() {
    this.service = service;
  }
  checkout = async (req, res, next) => {
    try {
      const { user_id } = req.user._id;
      const response = await this.checkout({ user_id });
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  };
}

export default PaymentsController;

const controller = new PaymentsController();
const { checkout } = controller;

export { checkout };
