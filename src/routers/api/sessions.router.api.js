import { Router } from "express";
// import has8char from "../../middlewares/has8char.mid.js";
import passport from "../../middlewares/passport.mid.js";
// import passCallBackMid from "../../middlewares/passCallBack.mid.js";
// import isAuth from "../../middlewares/isAuth.mid.js"

const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  // passCallBackMid("register"),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 201,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  // passCallBackMid("login"),
  async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .json({
          statusCode: 200,
          message: "Logged in!",
        });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);  

sessionsRouter.get(
  "/google/callback",
  passport.authenticate("google", { 
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in with google!",
        session: req.session
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post("/", async (req, res, next) => {
  try {
    if (req.session.email) {
      return res.json({
        statusCode: 200,
        message: "Session with email: " + req.session.email,
      });
    } else {
      const error = new Error("No Auth");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post(
  "/signout",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/api/sessions/signout/cb",
  }),
  async (req, res, next) => {
    try {
      return res.clearCookie("token").json({
          statusCode: 200,
          message: "Signed out!",
        });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Bad auth",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/signout/cb", (req, res, next) => {
  try {
    return res.json({
      statusCode: 400,
      message: "Already done",
    });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
