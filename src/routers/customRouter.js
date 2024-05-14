import { Router } from "express";
import jwt from "jsonwebtoken";
import dao from "../data/index.factory.js";
const { users } = dao

export default class customRouter {
  constructor() {
    this.router = Router();
    this.init();
  }
  getRouter() {
    return this.router;
  }
  init() {}
  applyCbs(cbs) {
    return cbs.map((each) => async (...params) => {
      try {
        await each.apply(this, params);
      } catch (error) {
        params[1].json({
          statusCode: 500,
          message: error.message,
        });
      }
    });
  }
  responses = (req, res, next) => {
    res.success200 = (payload) =>
      res.status(200).json({ statusCode: 200, response: payload });
    res.success201 = (payload) =>
      res.status(201).json({ statusCode: 201, response: payload });
    res.error400 = (message) => res.json({ statusCode: 400, message });
    res.error401 = () => res.status(401).json({ statusCode: 401, message: "Bad auth!" });
    res.error403 = () => res.status(403).json({ statusCode: 403, message: "Forbiden!" });
    res.error404 = () => res.status(404).json({ statusCode: 404, message: "Not found!" });
    return next();
  };
  policies = (arrayOfPolicies) => async (req, res, next) => {
    try {
      if (arrayOfPolicies.includes("PUBLIC")) return next();
      let token = req.cookies["token"];
      if (!token) return res.error401();
      else {
        const data = jwt.verify(token, process.env.PASS);
        if (!data) return res.error400("Bad auth by token");
        else {
          const { email, role } = data;
          if (
            (role === 0 && arrayOfPolicies.includes("USER")) ||
            (role === 1 && arrayOfPolicies.includes("ADMIN")) ||
            (role === 2 && arrayOfPolicies.includes("PREM"))
          ) {
            const user = await users.readByEmail(email);
            req.user = user;
            return next();
          } else return res.error403();
        }
      }
    } catch (error) {
      return next(error)
    }
  };
  post(path, policies, ...cbs) {
    this.router.post(path, this.responses,this.policies(policies), this.applyCbs(cbs));
  }
  get(path, policies, ...cbs) {
    this.router.get(path, this.responses,this.policies(policies), this.applyCbs(cbs));
  }
  put(path, policies, ...cbs) {
    this.router.put(path, this.responses,this.policies(policies), this.applyCbs(cbs));
  }
  delete(path, policies, ...cbs) {
    this.router.delete(path, this.responses,this.policies(policies), this.applyCbs(cbs));
  }
  use(path, ...cbs) {
    this.router.use(path, this.responses, this.applyCbs(cbs));
  }
}
