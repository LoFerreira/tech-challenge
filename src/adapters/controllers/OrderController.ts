import express, { Request, Response } from "express";
import {
  createOrderUseCase,
  getOrderPaymentStatusUseCase,
  getOrdersUseCase,
  getOrdersByStatusUseCase,
  updateOrderStatusUseCase
} from "../../config/dependencyInjection"; // Importando os use cases diretamente

const router = express.Router();

class OrderController {
  /*[CRIAR ORDER]
    Recebe os dados de CPF e produtos do corpo da requisição e cria um novo pedido.
    Valida se a lista de produtos é um array e retorna um erro se não for.
  */
  static createOrder = async (req: Request, res: Response) => {
    const { userCpf, products } = req.body;

    // Validação de formato de 'products'
    if (!Array.isArray(products)) {
      return res.status(400).send({ message: "products must be an array" });
    }

    try {
      // Chamando o use case diretamente para criar o pedido
      const newOrder = await createOrderUseCase.execute(userCpf, products);
      res.status(201).send(newOrder);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };

  /*[CONSULTAR STATUS DO PAGAMENTO DO PEDIDO]
    Recebe o ID do pedido através da query string e consulta o status do pagamento.
  */
  static getOrderPaymentStatus = async (req: Request, res: Response) => {
    const { orderId } = req.query;

    try {
      // Chamando o use case diretamente para consultar o status de pagamento
      const response = await getOrderPaymentStatusUseCase.execute(String(orderId));
      res.status(200).send(response);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  /*[LISTAR TODOS OS PEDIDOS]
    Lista todos os pedidos existentes.
  */
  static getOrders = async (req: Request, res: Response) => {
    try {
      // Chamando o use case diretamente para listar todos os pedidos
      const orders = await getOrdersUseCase.execute();
      res.status(200).send(orders);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  /*[LISTAR PEDIDOS POR STATUS]
    Recebe um ou mais status como query e lista os pedidos correspondentes.
  */
  static getOrderByStatus = async (req: Request, res: Response) => {
    const { status } = req.query;

    try {
      // Convertendo o status para um array de strings, se necessário
      let statusArray: string[];

      if (typeof status === "string") {
        statusArray = [status]; // Caso seja uma única string
      } else if (Array.isArray(status)) {
        statusArray = status as string[]; // Garante que é um array de strings
      } else {
        return res.status(400).send({ message: "Invalid status parameter" });
      }

      // Chamando o use case diretamente para listar pedidos por status
      const ordersByStatus = await getOrdersByStatusUseCase.execute(statusArray);
      res.status(200).send(ordersByStatus);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  /*[ATUALIZAR STATUS DO PEDIDO]
    Recebe o ID do pedido e as informações de pagamento e status pelo corpo da requisição.
    Atualiza o status do pedido.
  */
  static updateOrderStatus = async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const { payment, status } = req.body;

    try {
      // Chamando o use case diretamente para atualizar o status do pedido
      const updatedOrder = await updateOrderStatusUseCase.execute(orderId, { payment, status });
      
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json({ message: "Order status updated successfully", order: updatedOrder });
    } catch (error: any) {
      console.error("Error updating order status:", error);
      return res.status(500).json({ error: error.message });
    }
  };
}

// Definindo as rotas para os endpoints de pedidos
router.get("/orders", OrderController.getOrders);
router.get("/orders/status", OrderController.getOrderByStatus);
router.get("/order/payment/status", OrderController.getOrderPaymentStatus);
router.post("/orders", OrderController.createOrder);
router.put("/order/:id/status", OrderController.updateOrderStatus);

export default router;
