import { users } from "../data/mongo/manager.mongo.js";

class UsersService {
  constructor() {
    this.model = users;
  }
  create = async (data) => await this.model.create(data);
  read = async ({ filter, sortAndPaginate }) =>
    await this.model.read({ filter, sortAndPaginate });
  readOne = async (id) => await this.model.readOne(id);
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const service = new UsersService();
export default service;
