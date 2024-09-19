import { IOrderRepository } from '../../adapters/repositories/IOrderRepository';
import { IUserRepository } from '../../adapters/repositories/IUserRepository';
import { IProductRepository } from '../../adapters/repositories/IProductRepository';
import { Order } from '../entities/Order';
import { OrderDTO } from '../../adapters/dtos/OrderDTO';

interface ProductOrder {
    productId: string;
    quantity: number;
}

export class CreateOrderUseCase {
    constructor(
        private orderRepository: IOrderRepository,
        private userRepository: IUserRepository,
        private productRepository: IProductRepository
    ) { }

    async execute(userCpf: string, products: ProductOrder[]): Promise<OrderDTO> {
        // Verificar se o usuário existe
        const user = await this.userRepository.findByCpf(userCpf);
        if (!user) {
            throw new Error('User not found');
        }

        // Verificar e obter detalhes dos produtos
        const orderProducts = await Promise.all(
            products.map(async (product) => {
                const productData = await this.productRepository.findById(product.productId);
                if (!productData) {
                    throw new Error(`Product with ID ${product.productId} not found`);
                }
                return { productId: productData.id, quantity: product.quantity, price: productData.price };
            })
        );

        // Calcular o valor total do pedido
        const totalAmount = orderProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0);

        // Criar a entidade Order
        const order = new Order(
            'generated-id',
            user.id,
            'OPENED',
            orderProducts,
            new Date(),
            'PENDING',
            totalAmount,
            user
        );

        // Salvar o pedido no repositório
        const savedOrder = await this.orderRepository.save(order);

        // Retornar um DTO
        return {
            id: savedOrder.id,
            userId: savedOrder.userId,
            status: savedOrder.status,
            orderProducts: savedOrder.orderProducts,
            createdAt: savedOrder.createdAt,
            paymentStatus: savedOrder.paymentStatus,
            totalAmount: savedOrder.totalAmount
        };
    }
}
