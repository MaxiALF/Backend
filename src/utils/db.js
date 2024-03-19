import { connect } from "mongoose";

const dbConnection = async () => {
  try {
    await connect(process.env.MONGO_DB_LINK);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection; 
