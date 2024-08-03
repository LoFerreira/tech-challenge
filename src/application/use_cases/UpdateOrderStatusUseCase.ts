import { IOrderRepository } from '../../domain/interfaces/IOrderRepository';
import { Order } from '../../domain/entities/Order';

export class UpdateOrderStatusUseCase {
    constructor(private orderRepository: IOrderRepository) { }

    async execute(orderId: string, updateData: { payment?: string, status?: string }): Promise<Order | null> {
        // Atualizar o pedido com os novos dados fornecidos
        return await this.orderRepository.updateById(orderId, updateData);
    }
}

export default UpdateOrderStatusUseCase;
