import customRouter from "../customRouter.js";
import has8char from "../../middlewares/has8char.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";

export default class SessionsRouter extends customRouter {
  init() {
    this.post(
      "/register",
      ["PUBLIC"],
      has8char,
      passCallBackMid("register"),
      async (req, res, next) => {
        try {
          return res.success201(); 
        } catch (error) {
          return next(error);
        }
      }
    );

    this.post(
      "/login",
      ["PUBLIC"],
      passCallBackMid("login"),
      async (req, res, next) => {
        try {
          return res
            .cookie("token", req.token, {
              maxAge: 7 * 24 * 60 * 60 * 1000,
              httpOnly: true,
            })
            .success200();
        } catch (error) {
          return next(error);
        }
      }
    );

    this.post(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );

    this.get(
      "/google/callback",
      ["USER"],
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      async (req, res, next) => {
        try {
          return res.success200();
        } catch (error) {
          return next(error);
        }
      }
    );

    this.post(
      "/",
      ["PUBLIC"],
      passport.authenticate("jwt", {
        session: false,
        failureRedirect: "/api/sessions/signout/cb",
      }),
      async (req, res, next) => {
        try {
          const user = {
            email: req.user.email,
            role: req.user.role,
            photo: req.user.photo,
          };
          return res.success200(user);
        } catch (error) {
          return next(error);
        }
      }
    );

    this.post(
      "/signout",
      ["USER", "ADMIN", "PREM"],
      passCallBackMid("jwt"),
      async (req, res, next) => {
        try {
          return res
            .clearCookie("token")
            .success200();
        } catch (error) {
          return next(error);
        }
      }
    );

    this.get("/badauth", ["PUBLIC"], (req, res, next) => {
      try {
        return res.error401();
      } catch (error) {
        return next(error);
      }
    });

    this.get("/signout/cb", ["PUBLIC"], (req, res, next) => {
      try {
        return res.error400();
      } catch (error) {
        return next(error);
      }
    });
  }
}
