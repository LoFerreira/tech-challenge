import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

const payment = new Payment(client);

class PaymentService {
  static webhookUrl = "";

  static setWebhookUrl(url) {
    this.webhookUrl = url;
  }

  static async createPixPayment(order) {
    try {
      console.log(this.webhookUrl);
      const response = await payment.create({
        body: {
          transaction_amount: 0.1,
          description: `Pagamento do pedido ${order.id}`,
          payment_method_id: "pix",
          payer: {
            email: order.user.email,
            first_name: order.user.name,
            identification: {
              type: "CPF",
              number: order.user.cpf,
            },
          },
          notification_url: this.webhookUrl,
        },
        requestOptions: { idempotencyKey: order?.id },
      });

      return response;
    } catch (error) {
      console.error(
        "Erro ao criar pagamento PIX:",
        error.response ? error.response.data : error.message
      );
      throw new Error(`Erro ao criar pagamento PIX: ${error.message}`);
    }
  }
}

/*[DISPONIBILIZA AS PAYMENT-SERVICES]*/
export default PaymentService;
