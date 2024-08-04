import axios from "axios";

// Traduções de status de pedidos
export const OrderStatusTranslation: { [value: string]: string } = {
  OPENED: "Aberto",
  RECEIVED: "Recebido",
  PREPARING: "Em preparo",
  DONE: "Pronto para retirar",
  FINISHED: "Finalizado",
  CANCELED: "Cancelado",
};

// Função para buscar detalhes de pagamento
export const fetchPaymentDetails = async (paymentId: string): Promise<any> => {
  try {
    const response = await axios.get(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching payment details:", error.message);
    throw error;
  }
};

// Mapeia o status do pagamento para o status do pedido
export const mapPaymentStatusToOrderStatus = (paymentStatus: string): string => {
  const statusMap: { [key: string]: string } = {
    approved: "PAID",
    cancelled: "UNPAID",
    pending: "PENDING",
    in_process: "PROCESSING",
    rejected: "REJECTED",
  };

  return statusMap[paymentStatus] || "PENDING";
};
