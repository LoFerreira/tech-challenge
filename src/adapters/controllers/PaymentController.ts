import express, { Request, Response } from "express";
import {
  createPixPaymentUseCase,
  getOrdersUseCase,
  updateOrderStatusUseCase
} from "../../config/di/container"; // Importando os use cases diretamente
import { fetchPaymentDetails, mapPaymentStatusToOrderStatus } from "../../pkg/middleware/utils";

const router = express.Router();

class PaymentController {
  /*[PAGAR ORDER]
    Recebe o ID do pedido, busca o pedido e processa o pagamento via Pix.
  */
  static orderPayment = async (req: Request, res: Response) => {
    try {
      const { orderId } = req.body;

      // Validação do ID do pedido
      if (!orderId) {
        return res.status(400).json({ error: "Pedido inválido" });
      }

      // Busca o pedido diretamente pelo use case
      const order = await getOrdersUseCase.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      // Processa o pagamento Pix utilizando o use case apropriado
      const response = await createPixPaymentUseCase.execute(order);

      return res.status(201).json(response);
    } catch (error: any) {
      console.error("Erro ao processar pagamento:", error);
      return res.status(500).json({ error: error.message });
    }
  };

  /*[WEBHOOK DE ATUALIZAÇÃO DO STATUS DE PAGAMENTO]
    Recebe notificações de pagamento via webhook, atualiza o status do pedido com base no status de pagamento.
  */
  static webhook = async (req: Request, res: Response) => {
    try {
      const notification = req.body;

      console.log("Received notification:", notification);

      if (notification.type === "payment") {
        const paymentId = notification.data.id;

        // Obtém os detalhes do pagamento usando um método auxiliar
        const paymentDetails = await fetchPaymentDetails(paymentId);

        const orderId = paymentDetails.external_reference;
        const orderPaymentStatus = mapPaymentStatusToOrderStatus(paymentDetails.status);

        // Define o novo status do pedido com base no status de pagamento
        let orderStatus = "OPENED";
        if (orderPaymentStatus === "PAID") {
          orderStatus = "RECEIVED";
        } else if (orderPaymentStatus === "CANCELED") {
          orderStatus = "CANCELED";
        }

        // Atualiza o status do pedido diretamente pelo use case
        await updateOrderStatusUseCase.execute(orderId, {
          payment: orderPaymentStatus,
          status: orderStatus,
        });
      }

      res.sendStatus(200);
    } catch (error: any) {
      console.error("Erro ao processar notificação:", error);
      res.sendStatus(500);
    }
  };
}

// Definindo as rotas para os endpoints de pagamento
router.post("/webhook", PaymentController.webhook);
router.post("/orderPayment", PaymentController.orderPayment);

export default router;
