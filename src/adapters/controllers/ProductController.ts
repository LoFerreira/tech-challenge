import express, { Request, Response } from "express";
import ProductService from "../../domain/service/ProductService";

const router = express.Router();

/*[APIS PRODUTO]*/
class ProductController {


  /*[CRIAR PRODUTO]*/
  static createProduct = async (req: Request, res: Response) => {
    try {
      const savedProduct = await ProductService.createProduct(req.body);
      res.status(201).send(savedProduct);
    } catch (err : any) {
      res.status(500).send({ message: err.message });
    }
  };


  /*[ATUALIZAR PRODUTO]*/
  static updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const message = await ProductService.updateProduct(id, req.body);
      res.status(200).send(message);
    } catch (err : any) {
      res.status(500).send({ message: err.message });
    }
  };


  /*[DELETAR PRODUTO]*/
  static deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const message = await ProductService.deleteProduct(id);
      res.status(200).send(message);
    } catch (err : any) {
      res.status(500).send({ message: err.message });
    }
  };


/*[LISTAR PRODUTOS POR CATEGORIA PRODUTO]*/
  static listProductByCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    try {
      const productsByCategory = await ProductService.listProductsByCategory(category);
      res.status(200).send(productsByCategory);
    } catch (err : any) {
      res.status(500).send({ message: err.message });
    }
  };
}

/*[DEFININDO ENDPOINTS DE PRODUTO]*/
router.get("/products/:category", ProductController.listProductByCategory);
router.post("/products", ProductController.createProduct);
router.put("/products/:id", ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

export default router;
