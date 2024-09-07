import { CreateProductUseCase } from '../../Application/use_cases/producsts/CreateProductUseCase';
import { UpdateProductUseCase } from '../../Application/use_cases/producsts/UpdateProductUseCase';
import { DeleteProductUseCase } from '../../Application/use_cases/producsts/DeleteProductUseCase';
import { GetProductByIdUseCase } from '../../Application/use_cases/producsts/GetProductByIdUseCase';
import { ListProductsByCategoryUseCase } from '../../Application/use_cases/producsts/ListProductsByCategoryUseCase';
import { MongoProductRepository } from '../persistence/mongoose/repositories/MongoProductRepository';
import ProductService from '../../Application/services/ProductService';

import { CreateOrderUseCase } from '../../Application/use_cases/orders/CreateOrderUseCase';
import { GetOrderPaymentStatusUseCase } from '../../Application/use_cases/orders/GetOrderPaymentStatusUseCase';
import { GetOrdersUseCase } from '../../Application/use_cases/orders/GetOrdersUseCase';
import { GetOrdersByStatusUseCase } from '../../Application/use_cases/orders/GetOrdersByStatusUseCase';
import { UpdateOrderStatusUseCase } from '../../Application/use_cases/orders/UpdateOrderStatusUseCase';
import  MongoOrderRepository    from '../persistence/mongoose/repositories/MongoOrderRepository';
import OrderService from '../../Application/services/OrderService';

import { CreateUserUseCase } from '../../Application/use_cases/users/CreateUserUseCase';
import { GetUserByCpfUseCase } from '../../Application/use_cases/users/GetUserByCpfUseCase';
import { MongoUserRepository } from '../persistence/mongoose/repositories/MongoUserRepository';
import UserService from '../../Application/services/UserService';

import { CreatePixPaymentUseCase } from '../../Application/use_cases/payments/CreatePixPaymentUseCase';
import { PaymentService } from '../../Application/services/PaymentService';

// Instanciando os repositórios
const productRepository = new MongoProductRepository();
const userRepository = new MongoUserRepository();
const orderRepository = new MongoOrderRepository();  // Isso está correto

// Instanciando os casos de uso de produtos
const createProductUseCase = new CreateProductUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
const listProductsByCategoryUseCase = new ListProductsByCategoryUseCase(productRepository);

// Instanciando o serviço de produtos
const productService = new ProductService(
    createProductUseCase,
    updateProductUseCase,
    deleteProductUseCase,
    getProductByIdUseCase,
    listProductsByCategoryUseCase
);

// Instanciando os casos de uso de pedidos
const createOrderUseCase = new CreateOrderUseCase(orderRepository, userRepository, productRepository);
const getOrderPaymentStatusUseCase = new GetOrderPaymentStatusUseCase(orderRepository);
const getOrdersUseCase = new GetOrdersUseCase(orderRepository);
const getOrdersByStatusUseCase = new GetOrdersByStatusUseCase(orderRepository);
const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(orderRepository);

// Instanciando o serviço de pedidos
const orderService = new OrderService(
    createOrderUseCase,
    getOrderPaymentStatusUseCase,
    getOrdersUseCase,
    getOrdersByStatusUseCase,
    updateOrderStatusUseCase 
);

// Instanciando os casos de uso de usuários
const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserByCpfUseCase = new GetUserByCpfUseCase(userRepository);

// Instanciando o serviço de usuários
const userService = new UserService(
    createUserUseCase,
    getUserByCpfUseCase
);

// Instanciando o serviço de pagamentos
const paymentService = new PaymentService();

// Instanciando os casos de uso de pagamentos
const createPixPaymentUseCase = new CreatePixPaymentUseCase(paymentService);

// Exportando as instâncias para uso em outras partes da aplicação
export { productService, orderService, userService, createPixPaymentUseCase };
