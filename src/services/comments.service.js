import repository from "../repositories/comments.repository.js"

class CommentsService {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => await this.repository.create(data);
  read = async ({ filter, sortAndPaginate }) => await this.repository.read({ filter, sortAndPaginate });
  readOne = async (id) => await this.repository.readOne(id);
  update = async (data) => await this.repository.update(id, data);
  destroy = async (id) => await this.repository.destroy(id);
}

const service = new CommentsService();
export default service;
