import customRouter from "../customRouter.js";
import has8char from "../../middlewares/has8char.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import {
  badauth,
  google,
  login,
  me,
  register,
  signout,
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

    this.post("/", ["USER", "ADMIN", "PREM"], me);

    this.post(
      "/signout",
      ["USER", "ADMIN", "PREM"],
      passCallBackMid("jwt"),
      signout
    );

    this.get("/badauth", ["PUBLIC"], badauth);
  }
}

let sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();