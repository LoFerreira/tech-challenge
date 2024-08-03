import express, { Request, Response } from "express";
import { createPixPaymentUseCase } from "../../config/dependencyInjection";
import { fetchPaymentDetails, mapPaymentStatusToOrderStatus } from "../middleware/utils";
import { orderService } from "../../config/dependencyInjection";

const router = express.Router();

class PaymentController {
  /*[PAGAR ORDER]*/
  static orderPayment = async (req: Request, res: Response) => {
    try {
      const { orderId } = req.body;

      if (!orderId) {
        return res.status(400).json({ error: "Pedido inválido" });
      }

      const order = await orderService.findById(orderId).populate("user").populate("orderProducts.product");

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

  /*[WEBHOOK DE ATUALIZAÇAO DO STATUS DE PAGAMENTO]*/
  static webhook = async (req: Request, res: Response) => {
    try {
      const notification = req.body;

      console.log("Received notification:", notification);

      if (notification.type === "payment") {
        const paymentId = notification.data.id;
        const paymentDetails = await fetchPaymentDetails(paymentId);

        const orderId = paymentDetails.external_reference;
        const orderStatus = mapPaymentStatusToOrderStatus(paymentDetails.status);

        await orderService.findByIdAndUpdate(orderId, { status: orderStatus });
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