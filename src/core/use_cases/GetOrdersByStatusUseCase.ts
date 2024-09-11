import { IOrderRepository } from '../../adapters/repositories/IOrderRepository';
import { OrderDTO } from '../dtos/OrderDTO';
import { Order } from '../entities/Order';

export class GetOrdersByStatusUseCase {
    constructor(private orderRepository: IOrderRepository) {}

    async execute(status: string[]): Promise<OrderDTO[]> {
        // Buscar pedidos pelo status
        const orders: Order[] = await this.orderRepository.findByStatus(status);

        // Converter os pedidos para DTO
        return orders.map(order => this.toDTO(order));
    }

    private toDTO(order: Order): OrderDTO {
        return {
            id: order.id,
            userId: order.userId,
            status: order.status,
            orderProducts: order.orderProducts,
            createdAt: order.createdAt,
            paymentStatus: order.paymentStatus,
            totalAmount: order.totalAmount,
        };
    }
}

export default GetOrdersByStatusUseCase;
