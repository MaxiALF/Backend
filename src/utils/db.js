import { connect } from "mongoose";

const dbConnection = async () => {
  try {
    await connect(process.env.MONGO_DB_LINK);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection; 
