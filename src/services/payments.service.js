import repository from "../repositories/payments.repository.js";

class PaymentsService {
  constructor() {
    this.repository = repository;
  }
  checkout = async (filter) => {
    try {
      const response = await this.repository.checkout(filter);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = new PaymentsService();
export default service;
