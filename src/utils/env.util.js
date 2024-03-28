import { config } from "dotenv";
import args from "./args.util.js";

const { env } = args;
const path =
  env === "prod" ? "./.env.prod" : env == "dev" ? "./.env.dev" : "./.env.test";
config({ path });

export default {
  PORT: process.env.PORT,
  MONGO_DB_LINK: process.env.MONGO_DB_LINK,
  PASS: process.env.PASS,
  PASS_KEY: process.env.PASS_KEY,
  GOOGLE_ID: process.env.GOOGLE_ID,
  GOOGLE_CLIENT: process.env.GOOGLE_CLIENT,
  GIT_ID: process.env.GIT_ID,
  GIT_CLIENT: process.env.GIT_CLIENT,
  GOOGLE_EMAIL: process.env.GOOGLE_EMAIL, 
  GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD
};
