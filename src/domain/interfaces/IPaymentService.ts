import { Order } from "../entities/Order";
import { PaymentCreateResponse } from "../entities/Payment";

export interface IPaymentService {
    createPixPayment(order: Order): Promise<PaymentCreateResponse>;
    setWebhookUrl(url: string): void;
}