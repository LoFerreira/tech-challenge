import { PaymentService } from '../services/PaymentService';
import { Order } from '../../domain/entities/Order';
import { PaymentCreateResponse } from '../../domain/entities/Payment'; // Tipagem da resposta

export class CreatePixPaymentUseCase {
    constructor(private paymentService: PaymentService) { }

    async execute(order: Order) {
        return this.paymentService.createPixPayment(order);
    }
}