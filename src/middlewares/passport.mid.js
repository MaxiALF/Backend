import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as GithubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import UserDTO from "../dto/users.dto.js";
import dao from "../data/index.factory.js";
import env from "../utils/env.util.js";
import customError from "../utils/errors/customError.js";
import errors from "../utils/errors/errors.js";
import logger from "../utils/logger/index.js";

const { users } = dao;
const { GOOGLE_ID, GOOGLE_CLIENT, GIT_ID, GIT_CLIENT, PASS } = env;

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await users.readByEmail(email);
        if (!one) {
          let data = req.body;
          data.password = createHash(password);
          data = new UserDTO(data);
          let user = await users.create(data);
          return done(null, user);
        } else {
          return done(null, false, customError.new(errors.exist));
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await users.readByEmail(email);
        const verify = verifyHash(password, user.password);
        if (user?.verified && verify) {
          const token = createToken({ email, role: user.role });
          req.token = token;
          return done(null, user);
        } else {
          return done(null, false, customError.new(errors.auth));
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      passReqToCallback: true,
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await users.readByEmail(profile.id);
        if (user) {
          req.session.email = profile.id;
          req.session.role = user.role;
          return done(null, user);
        } else {
          user = {
            email: profile.id,
            name: profile.name.givenName,
            photo: profile.coverPhoto,
            password: createHash(profile.id),
          };
          user = await users.create(user);
          req.session.email = user.email;
          req.session.role = user.role;
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "github",
  new GithubStrategy(
    {
      passReqToCallback: true,
      clientID: GIT_ID,
      clientSecret: GIT_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/github/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
      logger.INFO(profile);
        let user = await users.readByEmail(profile.id);
        if (user) {
          req.session.email = user.email;
          req.session.role = user.role;
          return done(null, user);
        } else {
          user = {
            email: profile.id,
            name: profile.name.givenName,
            photo: profile.coverPhoto,
            password: createHash(profile.id),
          };
          user = await users.create(user);
          req.session.email = user.email;
          req.session.role = user.role;
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: PASS,
    },
    async (payload, done) => {
      try {
        const user = await users.readByEmail(payload.email);
        if (user) {
          user.password = null;
          return done(null, user);
        } else {
          return done(null, false, customError.new(errors.forbidden));
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
