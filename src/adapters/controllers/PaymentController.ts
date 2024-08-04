// PaymentController.ts

import express, { Request, Response } from "express";
import { createPixPaymentUseCase, orderService } from "../../config/dependencyInjection";
import { fetchPaymentDetails, mapPaymentStatusToOrderStatus } from "../middleware/utils";

const router = express.Router();

class PaymentController {
  /*[PAGAR ORDER]*/
  static orderPayment = async (req: Request, res: Response) => {
    try {
      const { orderId } = req.body;

      if (!orderId) {
        return res.status(400).json({ error: "Pedido inválido" });
      }

      // Utilize o serviço de pedidos para buscar a ordem pelo ID
      const order = await orderService.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      const response = await createPixPaymentUseCase.execute(order);

      return res.status(201).json(response);
    } catch (error: any) {
      console.error("Erro ao processar pagamento:", error);
      return res.status(500).json({ error: error.message });
    }
  };

  /*[WEBHOOK DE ATUALIZAÇÃO DO STATUS DE PAGAMENTO]*/
  static webhook = async (req: Request, res: Response) => {
    try {
      const notification = req.body;

      console.log("Received notification:", notification);

      if (notification.type === "payment") {
        const paymentId = notification.data.id;
        const paymentDetails = await fetchPaymentDetails(paymentId);

        const orderId = paymentDetails.external_reference;
        const orderPaymentStatus = mapPaymentStatusToOrderStatus(paymentDetails.status);
        
        // Novo código para determinar o status da ordem
        let orderStatus = "OPENED";
        if (orderPaymentStatus === "PAID") {
          orderStatus = "RECEIVED";
        } else if (orderPaymentStatus === "CANCELED") {
          orderStatus = "CANCELED";
        }

        // Utilize o serviço de pedidos para atualizar o status do pedido
        await orderService.updateOrderStatus(orderId, {
          payment: orderPaymentStatus,
          status: orderStatus,
        });
      }

      res.sendStatus(200);
    } catch (error) {
      console.error("Error processing notification:", error);
      res.sendStatus(500);
    }
  }
}

router.post("/webhook", PaymentController.webhook);
router.post("/orderPayment", PaymentController.orderPayment);

export default router;
