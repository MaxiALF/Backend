import OrderDTO from "../dto/orders.dto.js";
import dao from "../data/index.factory.js";

const { orders } = dao;

class OrdersRepository {
  constructor() {
    this.model = orders;
  }
  create = async (data) => {
    data = new OrderDTO(data);
    const response = await this.model.create(data);
    return response;
  };
  read = async ({ filter, sortAndPaginate }) =>
    await this.model.read({ filter, sortAndPaginate });
  readOne = async (uid) => await this.model.readOne(uid);
  update = async (oid, data) => await this.model.update(oid, data);
  destroy = async (id) => await this.model.destroy(id);
  report = async (uid) => await this.model.report(uid);
}

const repository = new OrdersRepository();
export default repository;
