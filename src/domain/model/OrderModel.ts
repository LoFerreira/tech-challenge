import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  id: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  orderProducts: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  status: { type: String, required: true },
  payment: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
});

const orders = mongoose.model("orders", orderSchema);

export default orders;
