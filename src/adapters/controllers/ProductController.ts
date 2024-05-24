import express, { Request, Response } from "express";
import multer from "multer";
import ProductService from "../../domain/service/ProductService";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

/*[APIS PRODUTO]*/
class ProductController {
  /*[CRIAR PRODUTO]*/
  static createProduct = async (req: Request, res: Response) => {
    const { name, category, price, description } = req.body;
    const imagePath = req?.file?.path || "";

    try {
      const newProduct = await ProductService.createProduct({
        name,
        category,
        price,
        description,
        imagePath,
        mimetype: req?.file?.mimetype,
      });

      res.status(201).send(newProduct);
    } catch (error: any) {
      res.status(500).send({ message: error?.message });
    }
  };

  /*[ATUALIZAR PRODUTO]*/
  static updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, category, price, description } = req.body;
    const imagePath = req?.file?.path || "";

    try {
      const response = await ProductService.updateProduct({
        id,
        name,
        category,
        price,
        description,
        imagePath,
        mimetype: req?.file?.mimetype,
      });

      res.status(200).send(response);
    } catch (error: any) {
      res.status(500).send({ message: error?.message });
    }
  };

  /*[DELETAR PRODUTO]*/
  static deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const message = await ProductService.deleteProduct(id);
      res.status(200).send(message);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  /*[LISTAR PRODUTOS POR CATEGORIA PRODUTO]*/
  static listProductByCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    try {
      const productsByCategory = await ProductService.listProductsByCategory(
        category
      );
      res.status(200).send(productsByCategory);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };
}

/*[DEFININDO ENDPOINTS DE PRODUTO]*/
router.get("/products/:category", ProductController.listProductByCategory);
router.post(
  "/products",
  upload.single("image"),
  ProductController.createProduct
);
router.put(
  "/products/:id",
  upload.single("image"),
  ProductController.updateProduct
);
router.delete("/products/:id", ProductController.deleteProduct);

export default router;
