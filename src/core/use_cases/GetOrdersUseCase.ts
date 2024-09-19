import { IOrderRepository } from '../../adapters/repositories/IOrderRepository';
import { OrderDTO } from '../../adapters/dtos/OrderDTO';
import { Order } from '../entities/Order';

export class GetOrdersUseCase {
    constructor(private orderRepository: IOrderRepository) {}

    async execute(): Promise<OrderDTO[]> {
        // Buscar todos os pedidos
        const orders: Order[] = await this.orderRepository.findAll();

        // Filtrar pedidos excluindo os finalizados
        const filteredOrders = orders.filter(order => order.status !== 'finalizado');

        // Converter os pedidos para DTO
        return filteredOrders.map(order => this.toDTO(order));
    }

    async getOrderById(orderId: string): Promise<OrderDTO | null> {
        const order = await this.orderRepository.findById(orderId);
        if (!order) return null;

        return this.toDTO(order);
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

export default GetOrdersUseCase;
