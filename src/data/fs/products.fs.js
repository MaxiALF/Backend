import fs from "fs";
import crypto from "crypto";

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
      return error.message
    }
  }

  async create(data) {
    try {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo,
          price: data.price,
          stock: data.stock,
        };
        this.products.push(product);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, 2)
        );
        console.log("Created ID: " + product.id);
        return product.id;
    } catch (error) {
      return error.message;
    }

  }
  read() {
    try {
      if (this.products.length === 0) {
        throw new Error("Not found products!");
      } else {
        return this.products;
      }
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      const one = this.products.find((each) => each.id === id);
      if (!one) {
        throw new Error(" Not found product with ID = " + id + " ! ");
      } else {
        return one;
      }
    } catch (error) {
      return error.message;
    }
  }
  
  async destroy(id) {
    try {
      const one = this.products.find((each) => each.id === id);
      if (!one) {
        throw new Error("Not found product!");
      } else {
        this.products = this.products.filter((each) => each.id !== id);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, 2)
        );
        console.log("destroy the ID: " + id);
        return one.id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  update(id, data) {
    try {
      const upOne = this.products.findIndex((each) => each.id === id);
      if (upOne === -1) {
        throw new Error(`Product with ID ${id} not found.`);
      }
      const updateProd =  {
        id: id,
        title: data.title || this.products[upOne].title,
        photo: data.photo || this.products[upOne].photo,
        price: data.price || this.products[upOne].price,
        stock: data.stock || this.products[upOne].stock,
      };

      this.products[upOne] = updateProd;

      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));

      return updateProd.id;
    } catch (error) {
      return error.message;
    }
  }
}

const products = new productManager("./src/data/fs/files/products.json");
// async function manage() {

//   await product.create({
//     title: "wheel dark BBS",
//     photo: "https://bbs.wheel_dark_nurburgring_edition",
//     price: "$500.000",
//     stock: "6",
//   });

//   await product.create({
//     title: "spark plug NGK Es8",
//     photo: "https://NGK_spark_plus_es8",
//     price: "$3.000",
//     stock: "3",
//   });

//   await product.create({
//     title: "piston Porsche 918 spyder",
//     photo: "https://Porsche_piston_918_spyder",
//     price: "$230.000",
//     stock: "8",
//   });

//   await console.log(product.products);
//   await console.log(product.read());
  // console.log(products.readOne(2));
  // await console.log(product.readOne('dd746573aa77d1522a4f810f'));

//   await product.destroy("326473085ce324d96ab691cb");
//   await product.destroy("1");
// }

// manage();

// products.update("4dd36d827394cb5c58ec4fc4", {title: "porsche piston", price: "$500.000",})

export default products;