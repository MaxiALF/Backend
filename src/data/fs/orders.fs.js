import fs from "fs";
import crypto from "crypto";

class ordersManager {
  constructor(path) {
    this.path = path;
    this.orders = [];
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
      return error.message;
    }
  }

  async create(data) {
    try {
      const order = {
        oid: crypto.randomBytes(12).toString("hex"),
        pid: data.pid,
        uid: data.uid,
        quantity: data.quantity,
        state: data.state,
      };
      this.orders.push(order);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.orders, null, 2)
      );
      console.log("Created ID: " + order.oid);
      return order.oid;
    } catch (error) {
      return error.message;
    }
  }
  
  read() {
    try {
      if (this.orders.length === 0) {
        throw new Error("Not found orders!");
      } else {
        return this.orders;
      }
    } catch (error) {
      return error.message;
    }
  }

  readOne(uid) {
    try {
      const one = this.orders.filter((each) => each.uid === uid);
      if (one.length === 0) {
        throw new Error(" Not found user with ID = " + uid + " ! ");
      } else {
        return one;
      }
    } catch (error) {
      return error.message;
    } 
  }

  async destroy(oid) {
    try {
      const one = this.orders.find((each) => each.oid === oid);
      if (!one) {
        throw new Error("Not found order!");
      } else {
        this.orders = this.orders.filter((each) => each.oid !== oid);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.orders, null, 2)
        );
        console.log("destroy the ID: " + oid);
        return one.oid;
      }
    } catch (error) {
      return error.message;
    }
  }

  update(oid, quantity, state) {
    try {
      const upOne = this.orders.findIndex((each) => each.oid === oid);

      if (upOne === -1) {
        throw new Error(`Order with ID ${oid} not found.`);
      }

      const inOrder = this.orders[upOne];

      if (quantity !== undefined && state === "paid") {
        const newQuantity = inOrder.quantity - quantity;

        if (newQuantity < 0) {
          throw new Error(`Not enough quantity available for order with ID ${oid}.`);
        }

        inOrder.quantity = newQuantity;
      }

      const updatedOrder = {
        oid: oid,
        pid: inOrder.pid,
        uid: inOrder.uid,
        quantity: inOrder.quantity,
        state: state !== undefined ? state : inOrder.state,
      };

      this.orders[upOne] = updatedOrder;

      fs.writeFileSync(this.path, JSON.stringify(this.orders, null, 2));

      console.log(`Updated order with ID: ${oid}`);
      return updatedOrder;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }
}

const orders = new ordersManager("./src/data/fs/files/orders.json");

// orders.create({
//   pid: "dd746573aa77d1522a4f810f",
//   uid: "a0e0db4a3f232334df5d06c3",
//   quantity:2,
//   state: "recived"
// })
// orders.create({
//   pid: "4dd36d827394cb5c58ec4fc4",
//   uid: "675bcbb010c32c9d1f173b5b",
//   quantity:10,
//   state: "paid"
// })
// orders.create({
//   pid: "dd746573aa77d1522a4f810f",
//   uid: "675bcbb010c32c9d1f173b5b",
//   quantity:8,
//   state: "reserved"
// })

// console.log (orders.readOne("675bcbb010c32c9d1f173b5b"));
// console.log(orders.destroy("e93bebb00564a9ffdaafbea4"));

// orders.update("6d29cc6554d779faa5c47b84", 1, "paid" );

export default orders;