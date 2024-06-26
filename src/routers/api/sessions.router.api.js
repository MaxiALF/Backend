import customRouter from "../customRouter.js";
import has8char from "../../middlewares/has8char.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import {
  badauth,
  google,
  gitHub,
  login,
  me,
  register,
  signout,
  verifyAccount,
  password,
  resetPassword,
} from "../../controllers/sessions.controller.js";

class SessionsRouter extends customRouter {
  init() {
    this.post(
      "/register",
      ["PUBLIC"],
      has8char,
      passCallBackMid("register"),
      register
    );

    this.post("/login", ["PUBLIC"], passCallBackMid("login"), login);

    this.post("/password", ["PUBLIC"], password);

    this.post("/reset/:token",["PUBLIC"], resetPassword)

    this.post(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );

    this.get(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      google
    );

    this.post(
      "/github",
      ["PUBLIC"],
      passport.authenticate("github", { scope: ["email", "profile"] })
    );

    this.get(
      "/github/callback",
      ["PUBLIC"],
      passport.authenticate("github", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      gitHub
    );

    this.post("/", ["USER", "ADMIN", "PREM"], me);

    this.post(
      "/signout",
      ["USER", "ADMIN", "PREM"],
      passCallBackMid("jwt"),
      signout
    );

    this.get("/badauth", ["PUBLIC"], badauth);

    this.post("/verify", ["PUBLIC"], verifyAccount);

    this.post("/confirmed", ["PUBLIC"]);
  }
}

let sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();
