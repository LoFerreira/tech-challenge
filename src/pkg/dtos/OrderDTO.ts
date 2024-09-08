import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  id: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    validate: {
      validator: async function (v) {
        if (v === "unidentified") {
          return true;
        }
        return (
          mongoose.isValidObjectId(v) &&
          (await mongoose.model("users").findById(v))
        );
      },
      message: (props) =>
        `${props.value} is not a valid user ID or 'unidentified' string!`,
    },
  },
  orderProducts: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ["OPENED", "RECEIVED", "PREPARING", "DONE", "FINISHED", "CANCELED"],
  },
  totalAmount: { type: Number, default: 0 },
  payment: {
    type: String,
    required: true,
    enum: ["PENDING", "PROCESSING", "PAID", "UNPAID", "REJECTED"],
  },
  createdAt: { type: Date, required: true, default: Date.now() },
});

const orders = mongoose.model("orders", orderSchema);

export default orders;
