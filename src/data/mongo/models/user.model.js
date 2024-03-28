import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true, index: true },
    photo: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    }, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0, enum: [0, 1, 2] },
    verified: {type: Boolean, default: false },
    verifiedCode: { type: String, required: true },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
const User = model(collection, schema);

export default User;
