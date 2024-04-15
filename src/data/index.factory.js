import argsUtil from "../utils/args.util.js";
import db from "../utils/db.js";
import env from "../utils/env.util.js";
import logger from "../utils/logger/index.js";

const environment = argsUtil.env;

let dao = {};

switch (environment) {
  case "test":
    logger.INFO("FILE SYSTEM CONNECTED");
    const { default: productsFs } = await import("./fs/products.fs.js");
    const { default: usersFs } = await import("./fs/users.fs.js");
    const { default: ordersFs } = await import("./fs/orders.fs.js");
    const { default: commentsFs } = await import("./fs/comments.js");
    dao = {
      products: productsFs,
      users: usersFs,
      orders: ordersFs,
      comments: commentsFs,
    };
    break;
  case "dev":
    db(env).then(() => logger.INFO("DB CONNECTED IN MODE DEV"));
    const { default: productsDB } = await import("./mongo/products.mongo.js");
    const { default: usersDB } = await import("./mongo/users.mongo.js");
    const { default: ordersDB } = await import("./mongo/orders.mongo.js");
    const { default: commentsDB } = await import("./mongo/comments.mongo.js");
    dao = {
      products: productsDB,
      users: usersDB,
      orders: ordersDB,
      comments: commentsDB,
    };
    break;
  default:
    db(env).then(() => logger.INFO("DB CONNECTED"));
    const { default: productsMongo } = await import(
      "./mongo/products.mongo.js"
    );
    const { default: usersMongo } = await import("./mongo/users.mongo.js");
    const { default: ordersMongo } = await import("./mongo/orders.mongo.js");
    const { default: commentsMongo } = await import(
      "./mongo/comments.mongo.js"
    );
    dao = {
      products: productsMongo,
      users: usersMongo,
      orders: ordersMongo,
      comments: commentsMongo,
    };
    break;
}

export default dao;
