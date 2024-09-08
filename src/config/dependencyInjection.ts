
// Importações para ProductService
import { CreateProductUseCase } from '../core/use_cases/CreateProductUseCase';
import { UpdateProductUseCase } from '../core/use_cases/UpdateProductUseCase';
import { DeleteProductUseCase } from '../core/use_cases/DeleteProductUseCase';
import { GetProductByIdUseCase } from '../core/use_cases/GetProductByIdUseCase';
import { ListProductsByCategoryUseCase } from '../core/use_cases/ListProductsByCategoryUseCase';
import { MongoProductRepository } from '../external/database/mongoDB/persistence/MongoProductRepository';
import ProductService from '../application/services/ProductService';

// Importações para OrderService
import { CreateOrderUseCase } from '../core/use_cases/CreateOrderUseCase';
import { GetOrderPaymentStatusUseCase } from '../core/use_cases/GetOrderPaymentStatusUseCase';
import { GetOrdersUseCase } from '../core/use_cases/GetOrdersUseCase';
import { GetOrdersByStatusUseCase } from '../core/use_cases/GetOrdersByStatusUseCase';
import { UpdateOrderStatusUseCase } from '../core/use_cases/UpdateOrderStatusUseCase'; // Nova importação
import { MongoOrderRepository } from '../external/database/mongoDB/persistence/MongoOrderRepository';
import OrderService from '../application/services/OrderService';

// Importações para UserService
import { CreateUserUseCase } from '../core/use_cases/CreateUserUseCase'; // Certifique-se de que esta importação exista
import { GetUserByCpfUseCase } from '../core/use_cases/GetUserByCpfUseCase';
import { MongoUserRepository } from '../external/database/mongoDB/persistence/MongoUserRepository';
import UserService from '../application/services/UserService';

// Instanciando o repositório de produtos
const productRepository = new MongoProductRepository();

// Instanciando o repositório de usuários
const userRepository = new MongoUserRepository();

// Instanciando o repositório de pedidos
const orderRepository = new MongoOrderRepository();

// Instanciando os casos de uso de produtos com o repositório
const createProductUseCase = new CreateProductUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
const listProductsByCategoryUseCase = new ListProductsByCategoryUseCase(productRepository);

// Instanciando o serviço de produtos com os casos de uso
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

// Instanciando o serviço de pedidos com os casos de uso
const orderService = new OrderService(
    createOrderUseCase,
    getOrderPaymentStatusUseCase,
    getOrdersUseCase,
    getOrdersByStatusUseCase,
    updateOrderStatusUseCase 
);

// Instanciando os casos de uso de usuários
const createUserUseCase = new CreateUserUseCase(userRepository); // Instanciação correta do caso de uso
const getUserByCpfUseCase = new GetUserByCpfUseCase(userRepository);

// Instanciando o serviço de usuários com os casos de uso
const userService = new UserService(
    createUserUseCase,
    getUserByCpfUseCase
);

// Importações para PaymentService
import { CreatePixPaymentUseCase } from '../core/use_cases/CreatePixPaymentUseCase';
import { PaymentService } from '../application/services/PaymentService';

// Instanciando o serviço de pagamentos
const paymentService = new PaymentService();

// Instanciando os casos de uso de pagamentos
const createPixPaymentUseCase = new CreatePixPaymentUseCase(paymentService);

// Exportando as instâncias para uso em outras partes da aplicação
export { productService, orderService, userService, createPixPaymentUseCase };