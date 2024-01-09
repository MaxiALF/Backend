class ordersManager {
  static #orders = [];

  create(data) {
    const order = {
      id:
        ordersManager.#orders.length === 0
          ? 1
          : ordersManager.#orders[ordersManager.#orders.length - 1].id + 1,
      productId: data.productId,
      userId: data.userId,
      quantity: data.quantity,
      state: data.state,
    };
    ordersManager.#orders.push(order);
  }
  read() {
    return ordersManager.#orders;
  }
  readOne(id) {
    return ordersManager.#orders.find((each) => each.id === Number(id));
  }

  destroy(id) {
    try {
      const one = ordersManager.#orders.find((each) => each.id === Number(id));
      if (!one) {
        throw new Error("Not found product!");
      } else {
        ordersManager.#orders = ordersManager.#orders.filter(
          (each) => each.id !== Number(id)
        );
        console.log("destroy the ID: " + Number(id));
        return one.id;
      }
    } catch (error) {
      return error.message;
    }
  }

  update(id, quantity, state) {
    try {
      const index = ordersManager.#orders.findIndex((order) => order.id === id);

      if (index === -1) {
        throw new Error(`Order with ID ${id} not found.`);
      }

      const currentOrder = ordersManager.#orders[index];

      if (quantity !== undefined && state === "paid") {
        const newQuantity = currentOrder.quantity - quantity;

        if (newQuantity < 0) {
          throw new Error(`Not enough quantity available for order with ID ${id}.`);
        }

        currentOrder.quantity = newQuantity;
      }

      const updatedOrder = {
        id: id,
        productId: currentOrder.productId,
        userId: currentOrder.userId,
        quantity: currentOrder.quantity,
        state: state !== undefined ? state : currentOrder.state,
      };

      ordersManager.#orders[index] = updatedOrder;

      console.log(`Updated order with ID: ${id}`);
      return updatedOrder.id;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }
}

const orders = new ordersManager();

orders.create({
  productId: "2",
  userId: "3",
  quantity: 4,
  state: "reserved",
});
orders.create({
  productId: "1",
  userId: "1",
  quantity: 2,
  state: "paid",
});
orders.create({
  productId: "3",
  userId: "3",
  quantity: 5,
  state: "paid",
});

// console.log(readOne(2));
// console.log(destroy(3));

// orders.update(3, 1, "paid");
// console.log(orders.read());