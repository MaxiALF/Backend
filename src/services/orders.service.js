import { orders } from "../data/mongo/manager.mongo.js";

class OrdersService {
  constructor() {
    this.model = orders;
  }
  create = async (data) => await this.model.create(data);
  read = async ({ filter, sortAndPaginate }) =>
    await this.model.read({ filter, sortAndPaginate });
  readOne = async (oid) => await this.model.readOne(oid);
  update = async (oid, data) => await this.model.update(oid, data);
  destroy = async (oid) => await this.model.destroy(oid);
  report = async (uid) => await this.model.report(uid);
}

const service = new OrdersService();
export default service;
