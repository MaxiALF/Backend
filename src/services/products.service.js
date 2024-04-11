import repository from "../repositories/products.repository.js";

class ProductsService {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => await this.repository.create(data);
  read = async ({ filter, sortAndPaginate }) => await this.repository.read({ filter, sortAndPaginate });
  readOne = async (id) => await this.repository.readOne(id);
  update = async (id, data) => await this.repository.update(id, data);
  destroy = async (id) => await this.repository.destroy(id);
}

const service = new ProductsService();
export default service;
