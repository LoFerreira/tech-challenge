import { MercadoPagoConfig, Payment } from "mercadopago";
import { Order } from "../../core/entities/Order";

export class PaymentService {
  private payment: Payment;
  static webhookUrl: string = "";

  constructor() {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
    });

    this.payment = new Payment(client);
  }

  static setWebhookUrl(url: string) {
    this.webhookUrl = url;
  }

  async createPixPayment(order: Order) {
    try {
      console.log(PaymentService.webhookUrl);
      const response = await this.payment.create({
        body: {
          transaction_amount: order.totalAmount,
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
          notification_url: PaymentService.webhookUrl,
        },
        requestOptions: { idempotencyKey: order.id },
      });

      // Supondo que o `response` contenha os dados diretamente
      return response;
    } catch (error: any) {
      console.error("Erro ao criar pagamento PIX:", error.response ? error.response.data : error.message);
      throw new Error(`Erro ao criar pagamento PIX: ${error.message}`);
    }
  }
}

export default  PaymentService;