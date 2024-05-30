import assert from "assert";
import MongoManager from "../../src/data/mongo/manager.mongo.js";
import dao from "../../src/data/index.factory.js";

const { products } = dao;

describe("Test model products", () => {
  const model = new MongoManager(products);
  const data = { title: "Pistón de competición", price: 23000 };
  let id;

  it("The creation of product requires one object with propertie 'title'", () => {
    assert.ok(data.title);
  });

  it("Creating a product does not need an object with the 'photo' property", () => {
    assert.strictEqual(data.photo, undefined);
  });

  it("The creator function of a product returns an object", async () => {
    const one = await model.create(data);
    assert.strictEqual(typeof one, "object");
  });

  it("The creator function of a product retunrs an object with the '_id' property", async () => {
    const one = await model.create(data);
    id = one._id;
    assert.ok(one._id);
  });

  it("Creating a product with an invalid price should throw an error", async () => {
    try {
      await model.create({
        title: "Pistón de competición",
        price: "55",
      });
    } catch (error) {
      assert.strictEqual(error.message.includes("Invalid price"), true);
    }
  });

  it("The delete function should remove a product by ID", async () => {
    await model.destroy(id);
    const found = await model.findById(id);
    assert.strictEqual(found, null);
  });

  it("The read function should return an array of products", async () => {
    const filter = {};
    const sortAndPaginate = {
      page: 1,
      limit:2,
      sort: { title: 1}
    }
    const products = await model.read({ filter, sortAndPaginate });
    assert.strictEqual(Array.isArray(products), true);
  });

  it("The readOne function return an object", async () => {
    const one = await model.readOne(id);
    assert.strictEqual(typeof one, "object");
  });

  it("Updating a product with incomplete data should return an error", async () => {
    const one = await model.create(data);
      await model.update(one._id, { _id: undefined });
      assert.strictEqual(error.notfound.includes("Not found"), true);
  });

});
