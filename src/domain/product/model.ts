import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *         - description
 *         - image
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         category:
 *           type: string
 *           description: The category of the product
 *         price:
 *           type: string
 *           description: The price of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         image:
 *           type: string
 *           description: The image of the product
 *       example:
 *         id: d5fE_asz,
 *         name: Harry Potter and the Goblet of Fire,
           category: lanche,
           price: 0500,
           description: First product test,
           image: test,
 */

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
