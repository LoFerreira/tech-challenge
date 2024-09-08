import express, { Request, Response } from "express";
import multer from "multer";
import {
  createProductUseCase,
  updateProductUseCase,
  deleteProductUseCase,
  getProductByIdUseCase,
  listProductsByCategoryUseCase,
} from "../../config/di/container"; // Importando os use cases diretamente

const router = express.Router();

// Configuração do multer para upload de arquivos
const upload = multer({ dest: "uploads/" });

/*[APIS PRODUTO]*/
class ProductController {
  /*[CRIAR PRODUTO]
    Cria um novo produto a partir dos dados enviados na requisição.
    O caminho da imagem do produto é salvo através do multer.
  */
  static createProduct = async (req: Request, res: Response) => {
    const { name, category, price, description } = req.body;
    const imagePath = req.file?.path || "";

    try {
      // Chamando diretamente o use case para criar o produto
      const newProduct = await createProductUseCase.execute({
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

  /*[ATUALIZAR PRODUTO]
    Atualiza as informações de um produto existente com base no ID fornecido.
  */
  static updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, category, price, description } = req.body;
    const imagePath = req.file?.path || "";

    try {
      // Chamando diretamente o use case para atualizar o produto
      const response = await updateProductUseCase.execute({
        id,
        name,
        category,
        price,
        description,
        imagePath,
        mimetype: req.file?.mimetype || "",
      });

      res.status(200).send(response);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };

  /*[DELETAR PRODUTO]
    Deleta um produto existente com base no ID fornecido.
  */
  static deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      // Chamando diretamente o use case para deletar o produto
      const message = await deleteProductUseCase.execute(id);
      res.status(200).send(message);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  /*[BUSCA PRODUTO PELO ID]
    Busca um produto existente com base no ID fornecido.
  */
  static getProductById = async (req: Request, res: Response) => {
    const { productId } = req.params;
    try {
      // Chamando diretamente o use case para obter o produto pelo ID
      const product = await getProductByIdUseCase.execute(String(productId));
      res.status(200).send(product);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  /*[LISTAR PRODUTOS POR CATEGORIA]
    Lista todos os produtos de uma categoria específica.
  */
  static listProductByCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    try {
      // Chamando diretamente o use case para listar produtos por categoria
      const productsByCategory = await listProductsByCategoryUseCase.execute(category);
      res.status(200).send(productsByCategory);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };
}

/*[DEFININDO ENDPOINTS DE PRODUTO]*/
// Definindo as rotas para os endpoints de produto
router.get("/products/:productId", ProductController.getProductById);
router.get("/products/category/:category", ProductController.listProductByCategory);
router.post("/products", upload.single("image"), ProductController.createProduct);
router.put("/products/:id", upload.single("image"), ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

export default router;
