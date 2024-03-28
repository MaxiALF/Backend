import fs from "fs";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class ordersManager {
  constructor(path, productsPath) {
    this.path = path;
    this.productsPath = productsPath;
    this.orders = [];
    this.products = [];
    this.init();
  }

  init() {
    try {
      const file = fs.existsSync(this.path);
      if (file) {
        this.orders = JSON.parse(fs.readFileSync(this.path, "utf-8"));
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
      this.orders.push(data);
      const jsonData = JSON.stringify(this.orders, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  read({ filter, sortAndPaginate }) {
    try {
      if (this.orders.length === 0) {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      } else {
        return this.orders;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = this.orders.filter((each) => each.user_id === id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(oid) {
    try {
      const one = this.orders.find((each) => each._oid === oid);
      notFoundOne(one);
      this.orders = this.orders.filter((each) => each._oid !== oid);
      const jsonData = JSON.stringify(this.orders, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(oid, data) {
    try {
      const one = this.orders.find((each) => each._oid === oid);
      notFoundOne(one);
      for (let each in data) {
        one[each] = data[each];
      }
      const jsonData = JSON.stringify(this.orders, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const orders = new ordersManager("./src/data/fs/files/orders.json");
export default orders;
