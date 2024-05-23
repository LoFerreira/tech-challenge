import express, { Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import products from "../../domain/model/ProductModel";
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

  /*[ATUALIZAR PRODUTO]*/
  static updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, category, price, description } = req.body;
    const imagePath = req?.file?.path || "";

    try {
      const product = await products.findById(id);
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }

      if (imagePath) {
        const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });
        const imageDataUri = `data:${req?.file?.mimetype};base64,${imageBase64}`;
        product.image = imageDataUri;
        fs.unlinkSync(imagePath);
      }

      product.name = name || product.name;
      product.category = category || product.category;
      product.price = price || product.price;
      product.description = description || product.description;

      await product.save();

      res.status(200).send(product);
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
