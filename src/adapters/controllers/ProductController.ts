import express, { Request, Response } from "express";
import multer from "multer";
import { productService } from "../../config/dependencyInjection"; // Importando a instância do serviço

const router = express.Router();

// Configuração do multer para upload de arquivos
const upload = multer({ dest: "uploads/" });

/*[APIS PRODUTO]*/
class ProductController {
  /*[CRIAR PRODUTO]*/
  static createProduct = async (req: Request, res: Response) => {
    // Extraindo dados do corpo da requisição e do arquivo de imagem
    const { name, category, price, description } = req.body;
    const imagePath = req.file?.path || "";

    try {
      // Chamando o serviço para criar um novo produto
      const newProduct = await productService.createProduct({
        name,
        category,
        price,
        description,
        imagePath,
        mimetype: req.file?.mimetype || "",
      });

      res.status(201).send(newProduct); // Retornando o novo produto
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };

  /*[ATUALIZAR PRODUTO]*/
  static updateProduct = async (req: Request, res: Response) => {
    // Extraindo o ID do produto e os dados de atualização
    const { id } = req.params;
    const { name, category, price, description } = req.body;
    const imagePath = req.file?.path || "";

    try {
      // Chamando o serviço para atualizar o produto
      const response = await productService.updateProduct({
        id,
        name,
        category,
        price,
        description,
        imagePath,
        mimetype: req.file?.mimetype || "",
      });

      res.status(200).send(response); // Retornando a resposta de sucesso
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };

  /*[DELETAR PRODUTO]*/
  static deleteProduct = async (req: Request, res: Response) => {
    // Extraindo o ID do produto dos parâmetros da requisição
    const { id } = req.params;
    try {
      // Chamando o serviço para deletar o produto
      const message = await productService.deleteProduct(id);
      res.status(200).send(message); // Retornando a mensagem de sucesso
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  /*[BUSCA PRODUTO PELO ID]*/
  static getProductById = async (req: Request, res: Response) => {
    // Extraindo o ID do produto dos parâmetros da requisição
    const { productId } = req.params;
    try {
      // Chamando o serviço para obter o produto pelo ID
      const product = await productService.getProductByID(String(productId));
      res.status(200).send(product); // Retornando o produto encontrado
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  /*[LISTAR PRODUTOS POR CATEGORIA]*/
  static listProductByCategory = async (req: Request, res: Response) => {
    // Extraindo a categoria dos parâmetros da requisição
    const { category } = req.params;
    try {
      // Chamando o serviço para listar produtos por categoria
      const productsByCategory = await productService.listProductsByCategory(category);
      res.status(200).send(productsByCategory); // Retornando os produtos encontrados
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
