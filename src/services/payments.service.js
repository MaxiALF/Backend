import repository from "../repositories/payments.repository.js";

class PaymentsService {
  constructor() {
    this.repository = repository;
  }
  checkout = async (filter) => await this.repository.checkout(filter);
}

const service = new PaymentsService();
export default service;
