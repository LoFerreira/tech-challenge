import { IOrderRepository } from '../../domain/interfaces/IOrderRepository';
import { Order } from '../../domain/entities/Order';

export class GetOrderPaymentStatusUseCase {
    constructor(private orderRepository: IOrderRepository) { }

    async execute(orderId: string): Promise<string> {
        // Buscar o pedido pelo ID
        const order = await this.orderRepository.findById(orderId);
        if (!order) throw new Error('Order not found');

        // Retornar o status do pagamento
        return order.paymentStatus;
    }
}

export default GetOrderPaymentStatusUseCase;