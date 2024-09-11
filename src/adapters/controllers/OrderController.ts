import express, { Request, Response } from "express";
import {
  createOrderUseCase,
  getOrderPaymentStatusUseCase,
  getOrdersUseCase,
  getOrdersByStatusUseCase,
  updateOrderStatusUseCase
} from "../../config/di/container"; 
import { OrderDTO } from "../../core/dtos/OrderDTO";

const router = express.Router();

class OrderController {
  /*[CRIAR ORDER] */
  static createOrder = async (req: Request, res: Response) => {
    const { userCpf, products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).send({ message: "products must be an array" });
    }

    try {
      // Chamando o use case diretamente para criar o pedido
      const newOrder: OrderDTO = await createOrderUseCase.execute(userCpf, products);
      res.status(201).send(newOrder);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };

  /*[CONSULTAR STATUS DO PAGAMENTO DO PEDIDO] */
  static getOrderPaymentStatus = async (req: Request, res: Response) => {
    const { orderId } = req.query;

    try {
      const response = await getOrderPaymentStatusUseCase.execute(String(orderId));
      res.status(200).send({ paymentStatus: response });
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  /*[LISTAR TODOS OS PEDIDOS] */
  static getOrders = async (req: Request, res: Response) => {
    try {
      const orders: OrderDTO[] = await getOrdersUseCase.execute();
      res.status(200).send(orders);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  /*[LISTAR PEDIDOS POR STATUS] */
  static getOrderByStatus = async (req: Request, res: Response) => {
    const { status } = req.query;

    try {
      let statusArray: string[];

      if (typeof status === "string") {
        statusArray = [status];
      } else if (Array.isArray(status)) {
        statusArray = status as string[];
      } else {
        return res.status(400).send({ message: "Invalid status parameter" });
      }

      const ordersByStatus: OrderDTO[] = await getOrdersByStatusUseCase.execute(statusArray);
      res.status(200).send(ordersByStatus);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  /*[ATUALIZAR STATUS DO PEDIDO] */
  static updateOrderStatus = async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const { payment, status } = req.body;

    try {
      const updatedOrder: OrderDTO | null = await updateOrderStatusUseCase.execute(orderId, { payment, status });
      
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json({ message: "Order status updated successfully", order: updatedOrder });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };
}

router.get("/orders", OrderController.getOrders);
router.get("/orders/status", OrderController.getOrderByStatus);
router.get("/order/payment/status", OrderController.getOrderPaymentStatus);
router.post("/orders", OrderController.createOrder);
router.put("/order/:id/status", OrderController.updateOrderStatus);

export default router;
