import { connect } from "mongoose";
import logger from "./logger/index.js";

const dbConnection = async () => {
  try {
    await connect(process.env.MONGO_DB_LINK);
  } catch (error) {
    logger.ERROR(error);
  }
};

export default dbConnection;
