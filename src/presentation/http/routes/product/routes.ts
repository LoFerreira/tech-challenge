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

  static updateProduct = (req: Request, res: Response) => {
    const { id } = req.params;

    products.findByIdAndUpdate(id, { $set: req.body }, (err: any) => {
      if (!err) {
        res.status(200).send({ message: "Product updated successfully." });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static deleteProduct = (req: Request, res: Response) => {
    const { id } = req.params;

    products.findByIdAndDelete(id, (err: any) => {
      if (!err) {
        res.status(200).send({ message: "Product deleted successfully." });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static listProductByCategory = (req: Request, res: Response) => {
    const { category } = req.query;

    products.find({ category }, {}, (err: any, products: any) => {
      if (!err) {
        res.status(200).send(products);
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };
}

// router.get("/books", BookController.listBooks);
// router.get("/product/:category", ProductController.getBookById);
router.get("/products/:category", ProductController.listProductByCategory);
router.post("/products", ProductController.createProduct);
router.put("/product/:id", ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

export default router;
