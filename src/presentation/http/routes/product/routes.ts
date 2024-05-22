import express, { Request, Response } from "express";
import products from "../../../../domain/product/model";

const router = express.Router();
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
    let product = new products(req.body);

    try {
      const savedProduct = await product.save();
      res.status(201).send(savedProduct.toJSON());
    } catch (err: any) {
      res
        .status(500)
        .send({ message: `${err.message} - Failure to register product.` });
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
router.post("/products", ProductController.createProduct);
router.put("/product/:id", ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

export default router;
