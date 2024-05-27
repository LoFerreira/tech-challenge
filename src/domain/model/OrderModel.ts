import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  id: { type: String },
  user: {
    type: Schema.Types.String,
    required: true,
    validate: {
      validator: async function (v) {
        if (v === "unidentified") {
          return true;
        }
        return (
          mongoose.isValidObjectId(v) &&
          (await mongoose.model("User").findById(v))
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
  status: { type: String, required: true },
  payment: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
});

const orders = mongoose.model("orders", orderSchema);

export default orders;
