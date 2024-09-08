import { PaymentService } from '../../application/services/PaymentService';
import { Order } from '../entities/Order';
import { PaymentCreateResponse } from '../entities/Payment'; // Tipagem da resposta

export class CreatePixPaymentUseCase {
    constructor(private paymentService: PaymentService) { }

    async execute(order: Order) {
        return this.paymentService.createPixPayment(order);
    }
}