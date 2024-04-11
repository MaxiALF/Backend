import repository from "../repositories/orders.repository.js"

class OrdersService {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => await this.repository.create(data);
  read = async ({ filter, sortAndPaginate }) => await this.repository.read({ filter, sortAndPaginate });
  readOne = async (oid) => await this.repository.readOne(oid);
  update = async (oid, data) => await this.repository.update(oid, data);
  destroy = async (oid) => await this.repository.destroy(oid);
  report = async (uid) => await this.repository.report(uid);
}

const service = new OrdersService();
export default service;
