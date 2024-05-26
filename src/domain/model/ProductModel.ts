import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: "String" },
  name: { type: "String", required: true },
  category: { type: "String", required: true },
  price: { type: "String", required: true },
  description: { type: "String", required: true },
  image: { type: "String", required: true },
});

const products = mongoose.model("products", productSchema);

export default products;
