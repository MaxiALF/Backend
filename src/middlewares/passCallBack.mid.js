import passport from "passport";
import errors from "../utils/errors/errors.js";
import customError from "../utils/errors/customError.js"

export default (strategy) => {
  return async (req, res, next) => {
    try {
      passport.authenticate(strategy, (error, user, info) => {
        if (error) {
          return next(error);
        }
        if (!user) {
          customError.new({
            message: info.message || errors.auth.message,
            statusCode: info.statusCode || errors.auth.statusCode,
          });
        }
        req.user = user;
        return next();
      })(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};
