import { IOrderRepository } from '../../domain/interfaces/IOrderRepository';
import { Order } from '../../domain/entities/Order';

export class GetOrdersUseCase {
    constructor(private orderRepository: IOrderRepository) { }

    async execute(): Promise<Order[]> {
        // Buscar todos os pedidos, excluindo os finalizados
        const orders = await this.orderRepository.findAll();
        return orders.filter(order => order.status !== 'finalizado');
    }
}

export default GetOrdersUseCase;