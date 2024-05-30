import { expect } from "chai";
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

  it("The creation of user requires one object with property 'email'", () => {
    expect(data).to.have.property('email');
  });

  it("Creating a user does not need an object with the 'last_name' property", () => {
    expect(data).to.not.have.property('last_name');
  });

  it("The creator function of a user returns an object", async () => {
    const one = await model.create(data);
    expect(one).to.be.an('object');
  });

  it("The creator function of a user returns an object with the '_id' property", async () => {
    const one = await model.create({
      name: "Igna",
      email: "igna@mail.com",
      password: "hello123",
      verifiedCode: "rgf601zwm655"
    });
    id = one._id;
    expect(one).to.have.property('_id');
  });

  it("The delete function should remove a user by ID", async () => {
    await model.destroy(id);
    const found = await model.readOne(id);
    expect(found).to.be.null;
  });

  it("The read function should return an array of users", async () => {
    const filter = {};
    const sortAndPaginate = {
      limit: 1,
      page: 1,
      sort: { name: 1 }
    };
    const users = await model.read({ filter, sortAndPaginate });
    expect(users).to.be.an('array');
  });

  it("The readOne function should return a user with the specified name", async () => {
    await model.create(data);
    const user = await model.readOne({ name: data.name });
    expect(user).to.have.property('name', data.name);
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
      console.log(error.message);
      expect(error.message).to.include("Invalid credentials");
    }
  });

  it("Updating a user with incomplete data should return an error", async () => {
    const one = await model.create(data);
    try {
      await model.update(one._id, { _id: undefined });
    } catch (error) {
      expect(error.message).to.include("Not found");
    }
  });
});
