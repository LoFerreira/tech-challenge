import { IOrderRepository } from '../../domain/interfaces/IOrderRepository';
import { Order } from '../../domain/entities/Order';

export class GetOrdersByStatusUseCase {
    constructor(private orderRepository: IOrderRepository) { }

    async execute(status: string[]): Promise<Order[]> {
        return this.orderRepository.findByStatus(status);
    }
}

export default GetOrdersByStatusUseCase;