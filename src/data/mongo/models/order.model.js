import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "orders";
const schema = new Schema(
  {
    product_id: { type: Types.ObjectId, required: true, ref: "products" },
    user_id: { type: Types.ObjectId, required: true, ref: "users" },
    quantity: { type: Number, default: 1 },
    state: {
      type: String,
      default: "reserved",
      emun: ["reserved", "paid", "deplayed"],
    },
  },
  { timestamps: true }
);

schema.pre("find", function () { this.populate("user_id", "-password -createdAT -updateAt -__v")})
schema.pre("find", function () { this.populate("product_id", "title price stock photo")})

schema.plugin(mongoosePaginate)
const Order = model(collection, schema);

export default Order;
