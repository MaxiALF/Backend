import assert from "assert";
import MongoManager from "../../src/data/mongo/manager.mongo.js";
import dao from "../../src/data/index.factory.js";

const { users } = dao;

describe("Test model users", () => {
  const model = new MongoManager(users);
  const data = {
    name: "Alejandro",
    email: "ale@mail.com",
    password: "hello123",
    verifiedCode: "rgf601zwm701"
  };
  let id;

  it("The creation of user requires one object with propertie 'email'", () => {
    assert.ok(data.email);
  });

  it("Creating a user does not need an object with the 'last_name' property", () => {
    assert.strictEqual(data.last_name, undefined);
  });

  it("The creator function of a user returns an object", async () => {
    const one = await model.create(data);
    assert.strictEqual(typeof one, "object");
  });

  it("The creator function of a user retunrs an object with the '_id' property", async () => {
    const one = await model.create({
        name: "Igna",
        email: "igna@mail.com",
        password: "hello123",
        verifiedCode: "rgf601zwm655"
    });
    id = one._id;
    assert.ok(one._id);
  });

  it("The delete function should remove a user by ID", async () => {
    await model.destroy(id);
    const found = await model.readOne(id);
    assert.strictEqual(found, null);
  });

  it("The read function should return an array of users", async () => {
    const filter = {};
    const sortAndPaginate = {
        limit: 1,
        page: 1,
        sort: { name: 1}
    }
    const users = await model.read({ filter, sortAndPaginate});
    assert.strictEqual(Array.isArray(users), true);
  });

  it("The readOne function should return a user with the specified name", async () => {
    await model.create(data);
    const user = await model.readOne({ name: data.name });
    assert.strictEqual(user.title, data.title);
  });

  it("Creating a user with an invalid email should throw an error", async () => {
    try {
      await model.create({
        name: "Alejandro",
        email: "ale.mail.com",
        password: "hello123",
        verifiedCode: "rgf601zwm701"
      });
    } catch (error) {
      assert.strictEqual(error.message.includes("Invalid credentials"), true);
    }
  });

  it("Updating a user with incomplete data should return an error", async () => {
    const one = await model.create(data);
    try {
      await model.update(one._id, { _id: undefined });
    } catch (error) {
      assert.strictEqual(error.notfound.includes("Not found"), true);
    }
  });
});
