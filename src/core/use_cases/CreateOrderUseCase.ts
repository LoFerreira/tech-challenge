import { IOrderRepository } from '../../adapters/repositories/IOrderRepository';
import { IUserRepository } from '../../adapters/repositories/IUserRepository';
import { IProductRepository } from '../../adapters/repositories/IProductRepository';
import { Order } from '../entities/Order';

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

    async execute(userCpf: string, products: ProductOrder[]): Promise<Order> {
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
        
        
        // Criar o pedido
        const order = new Order(
            'generated-id', // Será substituído pelo ID real ao salvar no repositório
            user.id, 
            'OPENED',
            orderProducts,
            new Date(),
            'PENDING',
            totalAmount,
            user 
        );

        // Salvar o pedido no repositório
        return this.orderRepository.save(order);
    }
}