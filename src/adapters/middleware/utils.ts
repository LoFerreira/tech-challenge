import axios from "axios";

export const OrderStatusTranslation: { [value: string]: string } = {
  OPENED: "Aberto",
  RECEIVED: "Recebido",
  PREPARING: "Em preparo",
  DONE: "Pronto para retirar",
  FINISHED: "Finalizado",
  Canceled: "Cancelado",
};

export const fetchPaymentDetails = async (paymentId) => {
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
  } catch (error) {
    console.error("Error fetching payment details:", error.message);
    throw error;
  }
};

export const mapPaymentStatusToOrderStatus = (paymentStatus) => {
  const statusMap = {
    approved: "PAID",
    cancelled: "UNPAID",
    pending: "PENDING",
    in_process: "PROCESSING",
    rejected: "REJECTED",
  };

  return statusMap[paymentStatus] || "PENDING";
};
