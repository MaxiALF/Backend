import { model, Schema, Types } from "mongoose";

const collection = "orders";
const schema = new Schema(
  {
    product_id: { type: Types.ObjectId, required: true, ref: "products" },
    user_id: { type: Types.ObjectId, required: true, ref: "users" },
    quantity: { type: Number, default: 1 },
    state: {
      type: String,
      default: "reserved",
      emun: ["reserved", "payed", "deplayed"],
    },
  },
  { timestamps: true }
);

const Order = model(collection, schema);

export default Order;
