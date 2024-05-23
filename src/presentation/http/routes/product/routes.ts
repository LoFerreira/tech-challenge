import express, { Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import products from "../../../../domain/product/model";

const router = express.Router();

const upload = multer({ dest: "uploads/" });
class ProductController {
  /**
   * @swagger
   * /api/products:
   *   post:
   *     summary: Retrieve a list of products
   *     description: Retrieve a list of products from the database
   *     responses:
   *       200:
   *         description: A list of products
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: "../../../../domain/product/model.ts"
   */
  static createProduct = async (req: Request, res: Response) => {
    const { name, category, price, description } = req.body;
    const imagePath = req?.file?.path || "";

    try {
      const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });
      const imageDataUri = `data:${req?.file?.mimetype};base64,${imageBase64}`;

      const newProduct = new products({
        name,
        category,
        price,
        description,
        image: imageDataUri,
      });

      await newProduct.save();

      fs.unlinkSync(imagePath);

      res.status(201).send(newProduct);
    } catch (error: any) {
      res.status(500).send({ message: error?.message });
    }
  };

  static updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await products.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Product updated successfully." });
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  static deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await products.findByIdAndDelete(id);
      res.status(200).send({ message: "Product deleted successfully." });
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  static listProductByCategory = async (req: Request, res: Response) => {
    const { category } = req.query;
    try {
      const productsByCategory = await products.find({ category }, {});
      res.status(200).send(productsByCategory);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };
}

// router.get("/books", BookController.listBooks);
// router.get("/product/:category", ProductController.getBookById);
router.get("/products/:category", ProductController.listProductByCategory);
router.post(
  "/products",
  upload.single("image"),
  ProductController.createProduct
);
router.put("/product/:id", ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

export default router;
