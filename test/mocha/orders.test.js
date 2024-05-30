import assert from "assert";
import MongoManager from "../../src/data/mongo/manager.mongo.js";
import dao from "../../src/data/index.factory.js";

const { orders } = dao;

describe("Test model order", () => {
  const model = new MongoManager(orders);
  const data = {
    product_id: "e22f09eb48bdd026a576ffa7",
    user_id: "afb3521cbcfb7dcc0ec9ce5c",
  };
  let id;

  it("The creation of order requires one object with propertie 'product_id'", () => {
    assert.ok(data.product_id);
  });

  it("Creating a order does not need an object with the 'state' property", () => {
    assert.strictEqual(data.state, undefined);
  });

  it("The creator function of a order returns an object", async () => {
    const one = await model.create(data);
    assert.strictEqual(typeof one, "object");
  });

  it("The creator function of a order retunrs an object with the '_id' property", async () => {
    const one = await model.create(data);
    id = one._id;
    assert.ok(one._id);
  });

  it("The delete function should remove a order by Id", async () => {
    await model.destroy(id);
    const found = await model.readOne(id);
    assert.strictEqual(found, null);
  });

  it("The read function should return an array of orders", async () => {
    const orders = await model.read();
    assert.strictEqual(Array.isArray(orders), true);
  });

  it("The readOne function should return a order with the specified user_id", async () => {
    await model.create(data);
    const order = await model.readOne({ user: data.user_id });
    assert.strictEqual(order.user, data.user);
  });

  it("Creating a order with an invalid product_id should throw an error", async () => {
    try {
      await model.create({
        product_id: 56489798,
        user_id: "afb3521cbcfb7dcc0ec9ce5c",
      });
    } catch (error) {
      assert.strictEqual(
        error.message.includes("orders validation failed"),
        true
      );
    }
  });

  it("Updating a order with incomplete data should return an error", async () => {
    const one = await model.create(data);
    await model.update(one._id, { _id: undefined });
    assert.strictEqual(error.message.includes("Not found"), true);
  });
});
