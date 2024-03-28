import fs from "fs"; 
import notFoundOne from "../../utils/notFoundOne.utils.js";

class productManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.init();
  }

  init() {
    try {
      const file = fs.existsSync(this.path);
      if (file) {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
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
      this.products.push(data);
      const jsonData = JSON.stringify(this.products, null, 2)
      await fs.promises.writeFile(this.path, jsonData)
      return data;
    } catch (error) {
      throw error;
    }
  } 

  read({ filter, sortAndPaginate }) {
    try {
      if (this.products.length === 0) {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      } else {
        return this.products;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = this.products.find((each) => each._id === id);
        notFoundOne(one)
        return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one)
        this.products = this.products.filter((each) => each._id !== id);
        const jsonData = JSON.stringify(this.products, null, 2)
        await fs.promises.writeFile(this.path, jsonData);
        return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const one = this.readOne(id);
      notFoundOne(one)
      for (let each in data) {
        one[each] = data[each]
      }
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const products = new productManager("./src/data/fs/files/products.json");
export default products;