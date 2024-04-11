import repository from "../repositories/users.repository.js";
import sendEmail from "../utils/sendEmail.utils.js";

class UsersService {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => await this.repository.create(data);
  read = async ({ filter, sortAndPaginate }) => await this.repository.read({ filter, sortAndPaginate });
  readOne = async (id) => await this.repository.readOne(id);
  readByEmail = async (email) => await this.repository.readByEmail(email);
  update = async (uid, data) => await this.repository.update(uid, data);
  destroy = async (id) => await this.repository.destroy(id);
  register = async (data) => {
    try {
      await sendEmail(data);
    } catch (error) {
      throw error;
    }
  };
}

const service = new UsersService();
export default service;
