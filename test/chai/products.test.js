import { expect } from "chai";
import "dotenv/config.js"
import MongoManager from "../../src/data/mongo/manager.mongo.js";
import dao from "../../src/data/index.factory.js"
const { products } = dao

describe("Test model products", () => {
    const model = new MongoManager(products);
    const data = { title: "caliper breake", price: 2000 };
    let id;

    it("The creation of product requires one object with propertie 'title'", () => {
      expect(data).to.have.property("title");
    });

    it("Creating a product does not need an object with the 'photo' property", () => {
      expect(data).not.to.have.property("photo");
    });

    it("The creator function of a product returns an object", async () => {
      const one = await model.create(data);
      expect(one).to.be.an("object");
    });

    it("The creator function of a product retunrs an object with the '_id' property", async () => {
      const one = await model.create(data);
      id = one._id;
      expect(one).to.have.property("_id");
    });

    it("Creating a product with an invalid price should throw an error", async () => {
      try {
        await model.create({
          title: "Pistón de competición",
          price: "55",
        });
      } catch (error) {
        expect(error.message).to.include("Invalid price");
      }
    });
  
    it("The delete function should remove a product by ID", async () => {
      await model.destroy(id);
      const found = await model.readOne(id);
      expect(found).to.be.null;
    });
  
    it("The read function should return an array of products", async () => {
      const filter = {};
      const sortAndPaginate = {
        page: 1,
        limit:2,
        sort: { title: 1}
      }
      const products = await model.read({ filter, sortAndPaginate });
      expect(products).to.be.an('array');
    });
  
    it("The readOne function return an object", async () => {
      const one = await model.readOne(id);
      expect(one).to.be.an('object');
    });
  
    it("Updating a product with incomplete data should return an error", async () => {
      const one = await model.create(data);
        await model.update(one._id, { _id: undefined });
        expect(error.message).to.include("Not found");
    });
  
  });