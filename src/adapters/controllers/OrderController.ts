import express, { Request, Response } from "express";
import OrderService from "../../domain/service/OrderService";

const router = express.Router();
class OrderController {
  /*[CRIAR ORDER]*/
  static createOrder = async (req: Request, res: Response) => {
    const { userId } = req.body;
    try {
      const newOrder = await OrderService.createOrder({
        userId,
      });

      res.status(201).send(newOrder);
    } catch (error: any) {
      res.status(500).send({ message: error?.message });
    }
  };

  /*[ADICIONAR PRODUTOS ORDER]*/
  static addProductsToOrder = async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { productIds } = req.body;

    if (!Array.isArray(productIds)) {
      return res.status(400).send({ message: "productIds must be an array" });
    }

    try {
      const updatedOrder = await OrderService.addProductsToOrder({
        orderId,
        productIds,
      });
      res.status(200).send(updatedOrder);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };

  /*[CONFIRMAR ORDER]*/
  static confirmOrder = async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { status, payment } = req.body;

    try {
      const updatedOrder = await OrderService.confirmOrder({
        orderId,
        status,
        payment,
      });
      res.status(200).send(updatedOrder);
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
  static listOrderByStatus = async (req: Request, res: Response) => {
    const { status } = req.body;
    try {
      const ordersByStatus = await OrderService.listOrdersByStatus(status);
      res.status(200).send(ordersByStatus);
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  };
}

router.get("/orders", OrderController.getOrders);
router.get("/orders/status", OrderController.listOrderByStatus);
router.put("/orders/:orderId", OrderController.addProductsToOrder);
router.put("/orders/:orderId/confirm", OrderController.confirmOrder);
router.post("/orders", OrderController.createOrder);
// router.put("/orders/:id", OrderController.updateBook);
// router.delete("/orders/:id", OrderController.deleteBook);

export default router;
