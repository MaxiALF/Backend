import CommentDTO from "../dto/comments.dto.js";
import dao from "../data/index.factory.js";

const { comments } = dao;

class CommentsRepository {
  constructor() {
    this.model = comments;
  }
  create = async (data) => {
    data = new CommentDTO(data);
    const response = await this.model.create(data);
    return response;
  };
  read = async ({ filter, options }) =>
    await this.model.read({ filter, options });
  readOne = async (id) => await this.model.readOne(id);
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const repository = new CommentsRepository();
export default repository;