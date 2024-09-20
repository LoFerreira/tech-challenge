import { IOrderRepository } from '../../adapters/repositories/IOrderRepository';
import { OrderDTO } from '../../adapters/dtos/OrderDTO';
import { Order } from '../entities/Order';
import { ORDER_STATUSES } from '../../external/database/mongoDB/frameworks/mongoose/models/OrderModel';

export class UpdateOrderStatusUseCase {
    constructor(private orderRepository: IOrderRepository) {}

    async execute(orderId: string, updateData: { payment?: string; status?: (typeof ORDER_STATUSES)[number] }): Promise<OrderDTO | null> {
        // Atualizar o pedido com os novos dados fornecidos
        const updatedOrder: Order | null = await this.orderRepository.updateById(orderId, updateData);

        // Se o pedido não foi encontrado, retornar null
        if (!updatedOrder) {
            return null;
        }

        // Converter o pedido atualizado para DTO
        return this.toDTO(updatedOrder);
    }

    // Método privado para converter a entidade Order em OrderDTO
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

export default UpdateOrderStatusUseCase;
