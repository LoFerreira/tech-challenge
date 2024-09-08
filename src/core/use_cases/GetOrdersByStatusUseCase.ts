import { IOrderRepository } from '../../adapters/repositories/IOrderRepository';
import { Order } from '../entities/Order';

export class GetOrdersByStatusUseCase {
    constructor(private orderRepository: IOrderRepository) { }

    async execute(status: string[]): Promise<Order[]> {
        return this.orderRepository.findByStatus(status);
    }
}

export default GetOrdersByStatusUseCase;