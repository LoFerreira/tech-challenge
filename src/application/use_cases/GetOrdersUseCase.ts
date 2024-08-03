import { IOrderRepository } from '../../domain/interfaces/IOrderRepository';
import { Order } from '../../domain/entities/Order';

export class GetOrdersUseCase {
    constructor(private orderRepository: IOrderRepository) { }

    async execute(): Promise<Order[]> {
        // Buscar todos os pedidos, excluindo os finalizados
        const orders = await this.orderRepository.findAll();
        return orders.filter(order => order.status !== 'finalizado');
    }

    async getOrderById(orderId: string): Promise<Order | null> {
        // Buscar o pedido pelo ID
        return await this.orderRepository.findById(orderId);
    }
}

export default GetOrdersUseCase;
