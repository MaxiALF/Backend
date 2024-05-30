import env from "../../src/utils/env.util.js";
import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:" + env.PORT + "/api");

describe(
  "Testing MAX POWER PARTS API", () => {

  const user = {
    name: "Maximiliano",
    email: "maxi_f198@hotmail.com",
    password: "hello123",
    role: 1,
    verified: true
  };
  let uid;
  let token = {};

  it("Register a user correctly", async () => {
    const result = await requester.post("/sessions/register").send(user);
    const { _body, statusCode} = result;
    uid = _body.response.id;
    expect(statusCode).to.be.equals(201);
  }).timeout(5000);

  it("Inicio de sesión correctamente", async () => {
    const response = await requester.post("/sessions/login").send(user);
    const { statusCode, headers } = response;
    token.key = headers["set-cookie"][0].split("=")[0]; 
    token.value = headers["set-cookie"][0].split("=")[1];
    expect(statusCode).to.be.equals(200);
  }).timeout(5000);

  describe(
    "Testing products",
    () => {
      it("to create a product", async () => {
        const product = {
          title: "Cremallera de dirección",
          price: 2000,
          stock: 3
        }
        let pid
        const one = await requester.post("/products").send(product)
        const { _body, statusCode } = one
        pid = _body.response._id
        expect(statusCode).to.be.equals(201)
      }). timedOut(10000)
      it("to read a one product", async () =>{
        const one = await requester.get("/products/" + pid)
        const { response } = one
        expect(response).to.be.equals("object")
      }
      )
      it("to delete a product", async () =>{
        const one = await requester.delete("/products/" + pid)
        const { statusCode } = one
        expect(statusCode).to.be.equals(200)
      })
    }
  )

  describe(
    "Testing orders",
    () => {
      let oid
      it("to create a order", async () => {
        const one = await requester.post("/orders").send(order)
        const { _body, statusCode } = one
        oid = _body.response._id
        expect(statusCode).to.be.equals(201)
      })
      it("to read orders", async () => {
        const all = await requester.get("/orders")
        const [] = all
        expect([]).to.be.equals("Array")
      })
      it("to update a order", async () => {
        const product = {
          price: 50000
        }
        const one = await requester.update("/orders"+ oid).send(product)
        const { statusCode } = one
        expect(statusCode).to.be.equals(200)
      })
    }
  )


  it("Cerrado de sesión correctamente", async () => {
    const response = await requester.post("/sessions/signout").set("Cookie", [
      token.key + "=" + token.value,
    ]);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  }).timeout(5000);

  it("Eliminación de un usuario correctamente", async () => {
    const response = await requester.delete("/users/" + uid);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  }).timeout(5000);

});