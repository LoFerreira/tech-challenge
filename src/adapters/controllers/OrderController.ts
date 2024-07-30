import express, { Request, Response } from "express";
import OrderService from "../../domain/service/OrderService";

const router = express.Router();
class OrderController {
  /*[CRIAR ORDER]*/
  static createOrder = async (req: Request, res: Response) => {
    const { userCpf, products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).send({ message: "products must be an array" });
    }

    try {
      const newOrder = await OrderService.createOrder({
        userCpf,
        products,
      });

      res.status(201).send(newOrder);
    } catch (error: any) {
      res.status(500).send({ message: error?.message });
    }
  };

  /*[CONSULTAR STATUS DO PAGAMENTO DO PEDIDO]*/
  static getOrderPaymentStatus = async (req: Request, res: Response) => {
    const { orderId } = req.query;
    console.log(orderId);
    try {
      const response = await OrderService.getOrderPaymentStatus(orderId);
      res.status(200).send(response);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  /*[LISTAR ORDERS]*/
  static getOrders = async (req: Request, res: Response) => {
    try {
      const orders = await OrderService.getOrders();
      res.status(200).send(orders);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  /*[LISTAR ORDERS POR STATUS ORDER]*/
  static getOrderByStatus = async (req: Request, res: Response) => {
    const { status } = req.query;

    try {
      const ordersByStatus = await OrderService.getOrdersByStatus(status);
      res.status(200).send(ordersByStatus);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };
}

router.get("/orders", OrderController.getOrders);
router.get("/orders/status", OrderController.getOrderByStatus);
router.get("/order/payment/status", OrderController.getOrderPaymentStatus);
router.post("/orders", OrderController.createOrder);

export default router;
