import customRouter from "../customRouter.js";

export default class UserRouter extends customRouter {
  init() {
    this.get("/register", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("register");
      } catch (error) {
        next(error);
      }
    });

    this.get("/login", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("login");
      } catch (error) {
        return next(error);
      }
    });

    this.get("/verifiedCode", ["PUBLIC"], async(req, res, next) =>{
      try {
        return res.render("verified")
      } catch (error) {
        return next(error)
      }
    })

    this.get("/chat", ["USER", "ADMIN", "PREM"], (req, res, next) => {
      try {
        return res.render("chat", {});
      } catch (error) {
        next(error);
      }
    });

    this.get("/confirmed", ["PUBLIC"], (req, res, next) => {
      try {
        return res.render("confirmed")
      } catch (error) {
        return next(error)
      }
    })
  }
}
