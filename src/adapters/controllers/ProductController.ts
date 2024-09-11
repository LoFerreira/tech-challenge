import express, { Request, Response } from "express";
import multer from "multer";
import {
  createProductUseCase,
  updateProductUseCase,
  deleteProductUseCase,
  getProductByIdUseCase,
  listProductsByCategoryUseCase,
} from "../../config/di/container"; 
import { ProductDTO } from "../../core/dtos/ProductDTO";  // Importando o DTO

const router = express.Router();
const upload = multer({ dest: "uploads/" });

class ProductController {
  static createProduct = async (req: Request, res: Response) => {
    const { name, category, price, description } = req.body;
    const imagePath = req.file?.path || "";

    try {
      const newProduct: ProductDTO = await createProductUseCase.execute({
        name,
        category,
        price,
        description,
        imagePath,
        mimetype: req.file?.mimetype || "",
      });

      res.status(201).send(newProduct);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };

  static updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, category, price, description } = req.body;
    const imagePath = req.file?.path || "";

    try {
      const updatedProduct: ProductDTO | null = await updateProductUseCase.execute({
        id,
        name,
        category,
        price,
        description,
        imagePath,
        mimetype: req.file?.mimetype || "",
      });

      if (!updatedProduct) {
        return res.status(404).send({ message: "Product not found" });
      }

      res.status(200).send(updatedProduct);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };

  static deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await deleteProductUseCase.execute(id);
      res.status(200).send({ message: "Product deleted successfully" });
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  static getProductById = async (req: Request, res: Response) => {
    const { productId } = req.params;
    try {
      const product: ProductDTO | null = await getProductByIdUseCase.execute(String(productId));
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
      res.status(200).send(product);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  static listProductByCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    try {
      const productsByCategory: ProductDTO[] = await listProductsByCategoryUseCase.execute(category);
      res.status(200).send(productsByCategory);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };
}

router.get("/products/:productId", ProductController.getProductById);
router.get("/products/category/:category", ProductController.listProductByCategory);
router.post("/products", upload.single("image"), ProductController.createProduct);
router.put("/products/:id", upload.single("image"), ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

export default router;
