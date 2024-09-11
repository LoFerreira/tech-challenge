import { IOrderRepository } from '../../adapters/repositories/IOrderRepository';
import { OrderDTO } from '../dtos/OrderDTO';

export class GetOrderPaymentStatusUseCase {
    constructor(private orderRepository: IOrderRepository) { }

    async execute(orderId: string): Promise<string> {
        // Buscar o pedido pelo ID
        const order: OrderDTO | null = await this.orderRepository.findById(orderId);
        if (!order) throw new Error('Order not found');

        // Retornar o status do pagamento
        return order.paymentStatus;
    }
}

export default GetOrderPaymentStatusUseCase;
