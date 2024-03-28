import fs from "fs";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class userManager {
  constructor(path) {
    this.path = path;
    this.users = [];
    this.init();
  }
  init() {
    try {
      const file = fs.existsSync(this.path);
      if (file) {
        this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      } else {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      }
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    try {
      this.users.push(data);
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  read({ filter, sortAndPaginate }) {
    try {
      if (this.users.length === 0) {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      } else {
        return this.users;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = this.users.find((each) => each._id === id);
      if (!one) {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  readByEmail(email) {
    try {
      const one = this.users.find((each) => each.email === email);
      if (!one) {
        return null;
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one);
      this.users = this.users.filter((each) => each._id !== id);
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(uid, data) {
    try {
      const one = this.readOne(uid);
      notFoundOne(one);
      for (let each in data) {
        one[each] = data[each];
      }
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const users = new userManager("./src/data/fs/files/users.json");
export default users;
