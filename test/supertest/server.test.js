import env from "../../src/utils/env.util.js";
import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:" + env.PORT + "/api");

describe("Testing MAX POWER PARTS API", () => {

  describe("Testing users", () => {
  let uid;
  let token = {}; 

    const user = {
      name: "Maximiliano",
      email: "maxi_f198@hotmail.com",
      password: "hello123",
      role: 2,
      verified: true,
    }; 

  it("Register a user", async () => {
    const result = await requester.post("/sessions/register").send(user);
    const { _body, statusCode } = result;
    uid = _body.response.id;
    expect(statusCode).to.be.equals(201);
  }).timeout(5000);

  it("Loggin", async () => {
    const response = await requester.post("/sessions/login").send(user);
    const { statusCode, headers } = response;
    token.key = headers["set-cookie"][0].split("=")[0];
    token.value = headers["set-cookie"][0].split("=")[1];
    expect(statusCode).to.be.equals(200);
  }).timeout(5000);

  it("Logged out", async () => {
    const response = await requester
      .post("/sessions/signout")
      .set("Cookie", [token.key + "=" + token.value]);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  }).timeout(5000);

  it("Delete user", async () => {
    const response = await requester.delete("/users/" + uid);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  }).timeout(5000);
});

    it("Read all users", async () => {
      const all = await requester.get("/users");
      const { statusCode } = all;
      expect(statusCode).to.be.equals(200);
    }).timeout(5000);

    it("Read a user", async () => {
      const one = await requester.get("/users/" + uid);
      const { statusCode } = one;
      expect(statusCode).to.be.equals(200);
    }).timeout(5000);

    it("Update a user", async () => {
      const dataUp = {
        name: "Maxilos",
      };
      const one = await requester.put("/users/" + uid).send(dataUp);
      const { statusCode } = one;
      expect(statusCode).to.be.equals(200);
    }).timeout(5000);


  describe("Testing products", () => {

    let pid;

    it("to create a product", async () => {
      const product = {
        owner_id: uid,
        title: "Cremallera de dirección",
        price: 2000,
        stock: 3,
      };

      const one = await requester.post("/products").send(product).set("Cookie", [token.key + "=" + token.value]);
      const { _body, statusCode } = one;
      pid = _body.response._id;
      expect(statusCode).to.be.equals(201);
    }).timeout(5000);

    it("to read a one product", async () => {
      const one = await requester.get("/products/" + pid);
      const { _body } = one;
      expect(_body).to.be.an("object");
    }).timeout(5000);

    it("To read all products", async () => {
      const all = await requester.get("/products");
      const { statusCode } = all;
      expect(statusCode).to.be.equals(200);
    }).timeout(5000);

    it("Update a product", async () => {
      const dataUp = {
        price: 20,
        stock: 4,
      };
      const one = await requester.put("/products/" + pid).send(dataUp).set("Cookie", [token.key + "=" + token.value]);
      const { statusCode } = one;
      expect(statusCode).to.be.equals(200);
    }).timeout(5000);

    it("to delete a product", async () => {
      const one = await requester.delete("/products/" + pid).set("Cookie", [token.key + "=" + token.value]);
      const { statusCode } = one;
      expect(statusCode).to.be.equals(200);
    }).timeout(5000);
  });

  describe("Testing orders", () => {

    let oid;

    const order = {
      product_id: "bea44aa90648a03cf0bc645f",
      user_id: "58c7d292dc1e3cb344076ce6",
      quantity: 2,
    };

    it("to create a order", async () => {
      const one = await requester.post("/orders").send(order);
      const { _body, statusCode } = one;
      oid = _body.response._id;
      expect(statusCode).to.be.equals(201);
    }).timeout(5000);

    it("to read orders", async () => {
      const all = await requester.get("/orders");
      const { statusCode } = all;
      expect(statusCode).to.be.equals(200);
    }).timeout(5000);

    it("Read a order", async () => {
      const one = await requester.get("/orders/" + oid);
      const { statusCode } = one;
      expect(statusCode).to.be.equals(200);
    }).timeout(5000);

    it("to update a order", async () => {
      const orderUp = {
        price: 50000,
      };
      const one = await requester.put("/orders" + oid).send(orderUp);
      const { statusCode } = one;
      expect(statusCode).to.be.equals(200);
    }).timeout(5000);
  });

  it("Delete a order", async () => {
    const one = await requester.delete("/orders/" + oid);
    const { statusCode } = one;
    expect(statusCode).to.be.equals(200);
  }).timeout(5000);
});
