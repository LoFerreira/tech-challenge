import express, { Request, Response } from "express";
import { orderService } from "../../config/dependencyInjection"; // Importando a instância do serviço

const router = express.Router();

class OrderController {
  /*[CRIAR ORDER]*/
  static createOrder = async (req: Request, res: Response) => {
    const { userCpf, products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).send({ message: "products must be an array" });
    }

    try {
      // Chamando o serviço para criar um novo pedido
      const newOrder = await orderService.createOrder(userCpf, products);
      res.status(201).send(newOrder);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };


  /*[CONSULTAR STATUS DO PAGAMENTO DO PEDIDO]*/
  static getOrderPaymentStatus = async (req: Request, res: Response) => {
    const { orderId } = req.query;

    try {
      // Chamando o serviço para consultar o status do pagamento
      const response = await orderService.getOrderPaymentStatus(String(orderId));
      res.status(200).send(response);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };


  /*[LISTAR ORDERS]*/
  static getOrders = async (req: Request, res: Response) => {
    try {
      // Chamando o serviço para listar todos os pedidos
      const orders = await orderService.getOrders();
      res.status(200).send(orders);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  /*[LISTAR ORDERS POR STATUS]*/
  static getOrderByStatus = async (req: Request, res: Response) => {
    const { status } = req.query;

    try {
      // Verificando o tipo de 'status' e convertendo para um array de strings se necessário
      let statusArray: string[];

      if (typeof status === "string") {
        statusArray = [status]; // Converte string para array de uma única string
      } else if (Array.isArray(status)) {
        statusArray = status as string[]; // Garante que seja um array de strings
      } else {
        return res.status(400).send({ message: "Invalid status parameter" });
      }

      // Chamando o serviço para listar pedidos por status
      const ordersByStatus = await orderService.getOrdersByStatus(statusArray);
      res.status(200).send(ordersByStatus);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  static async updateOrderStatus(req, res) {
    const orderId = req.params.id;
    const { status } = req.body;

    try {
      const order = await OrderService.updateOrderStatus({ orderId, status });
      return res
        .status(200)
        .json({ message: "Order status updated successfully", order });
    } catch (error: any) {
      console.error("Error updating order status:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}

// Definindo as rotas para os endpoints de pedidos
router.get("/orders", OrderController.getOrders);
router.get("/orders/status", OrderController.getOrderByStatus);
router.get("/order/payment/status", OrderController.getOrderPaymentStatus);
router.post("/orders", OrderController.createOrder);
router.put("/order/:id/status", OrderController.updateOrderStatus);

export default router;
