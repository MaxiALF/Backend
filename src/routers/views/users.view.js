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

    this.get("/reset", ["PUBLIC"], async (req,res,next) => {
      try {
        return res.render("reset")
      } catch (error) {
        return next(error)
      }
    })

    this.get("/reset/:token", ["PUBLIC"], async (req,res,next) => {
      try {
        return res.render("passwordReset")
      } catch (error) {
        return next(error)
      }
    })

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

    this.get("/confirmed", ["USER", "PREM"], (req, res, next) => {
      try {
        return res.render("confirmed")
      } catch (error) {
        return next(error)
      }
    })

    this.get("/documents", ["USER", "ADMIN", "PREM"], (req, res, next) => {
      try {
        return res.render("documents")
      } catch (error) {
        return next(error)
      }
    })

    this.get("/profile", ["USER", "ADMIN", "PREM"], async (req, res, next) => {
      try {
        const user = {
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
          photo: req.user.photo,
        };
        return res.render("profile", { user })
      } catch (error) {
        return next(error)
      }
    })
  }
}
