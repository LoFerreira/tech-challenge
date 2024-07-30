import axios from "axios";

export const OrderStatusTranslation: { [value: string]: string } = {
  PAID: "Pago",
  PENDING: "Aguardando Pagamento",
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
    in_process: "PENDING",
    rejected: "REJECTED",
  };

  return statusMap[paymentStatus] || "recebido";
};
