import { IOrderRepository } from '../../adapters/repositories/IOrderRepository';
import { OrderDTO } from '../../adapters/dtos/OrderDTO';
import { Order } from '../entities/Order';
import { ORDER_STATUSES } from '../../external/database/mongoDB/frameworks/mongoose/models/OrderModel';

export class GetOrdersUseCase {
    constructor(private orderRepository: IOrderRepository) {}

    async execute(): Promise<OrderDTO[]> {
        // Buscar todos os pedidos
        const orders: Order[] = await this.orderRepository.findAll();

        // Filtrar pedidos excluindo os finalizados
        const filteredOrders = orders.filter(order => order.status !== ORDER_STATUSES[4]);

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
            _id: order._id,
            user: order.user,
            status: order.status,
            orderProducts: order.orderProducts,
            createdAt: order.createdAt,
            paymentStatus: order.paymentStatus,
            totalAmount: order.totalAmount,
        };
    }
}

export default GetOrdersUseCase;
