import UserDTO from "../dto/users.dto.js"
import dao from "../data/index.factory.js";

const { users } = dao;

class UsersRepository {
  constructor() {
    this.model = users;
  }
  create = async (data) => await this.model.create(new UserDTO(data))
  read = async ({ filter, sortAndPaginate }) =>
    await this.model.read({ filter, sortAndPaginate });
  readOne = async (id) => await this.model.readOne(id);
  readByEmail = async(email) => await this.model.readByEmail(email)
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const repository = new UsersRepository();
export default repository;