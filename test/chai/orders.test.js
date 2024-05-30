import { expect } from "chai";
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

  it("The creation of order requires one object with property 'product_id'", () => {
    expect(data).to.have.property('product_id');
  });

  it("Creating an order does not need an object with the 'state' property", () => {
    expect(data).to.not.have.property('state');
  });

  it("The creator function of an order returns an object", async () => {
    const one = await model.create(data);
    expect(one).to.be.an('object');
  });

  it("The creator function of an order returns an object with the '_id' property", async () => {
    const one = await model.create(data);
    id = one._id;
    expect(one).to.have.property('_id');
  });

  it("The delete function should remove an order by Id", async () => {
    await model.destroy(id);
    const found = await model.readOne(id);
    expect(found).to.be.null;
  });

  it("The read function should return an array of orders", async () => {
    const filter = {};
    const sortAndPaginate = {
        limit: 2,
        page: 1,
        sort: { user_id: 1}
    }
    const orders = await model.read({ filter, sortAndPaginate });
    expect(orders).to.be.an('array');
  });

  it("The readOne function should return an order with the specified user_id", async () => {
    await model.create(data);
    const order = await model.readOne({ user: data.user_id });
    expect(order).to.have.property('user_id', data.user_id);
  });

  it("Creating an order with an invalid product_id should throw an error", async () => {
    try {
      await model.create({
        product_id: 56489798,
        user_id: "afb3521cbcfb7dcc0ec9ce5c",
      });
    } catch (error) {
      expect(error.message).to.include("orders validation failed");
    }
  });

  it("Updating an order with incomplete data should return an error", async () => {
    const one = await model.create(data);
    try {
      await model.update(one._id, { _id: undefined });
    } catch (error) {
      expect(error.message).to.include("Not found");
    }
  });
});
