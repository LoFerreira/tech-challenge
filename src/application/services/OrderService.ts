import { CreateOrderUseCase } from '../../core/use_cases/CreateOrderUseCase';
import { GetOrderPaymentStatusUseCase } from '../../core/use_cases/GetOrderPaymentStatusUseCase';
import { GetOrdersUseCase } from '../../core/use_cases/GetOrdersUseCase';
import { GetOrdersByStatusUseCase } from '../../core/use_cases/GetOrdersByStatusUseCase';
import { UpdateOrderStatusUseCase } from '../../core/use_cases/UpdateOrderStatusUseCase';

export class OrderService {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private getOrderPaymentStatusUseCase: GetOrderPaymentStatusUseCase,
    private getOrdersUseCase: GetOrdersUseCase,
    private getOrdersByStatusUseCase: GetOrdersByStatusUseCase,
    private updateOrderStatusUseCase: UpdateOrderStatusUseCase 
  ) {}

  async getOrderById(orderId: string) {
    return await this.getOrdersUseCase.getOrderById(orderId); 
  }

  createOrder(userCpf: string, products: { productId: string, quantity: number }[]) {
    return this.createOrderUseCase.execute(userCpf, products);
  }

  getOrderPaymentStatus(orderId: string) {
    return this.getOrderPaymentStatusUseCase.execute(orderId);
  }

  getOrders() {
    return this.getOrdersUseCase.execute();
  }

  getOrdersByStatus(status: string[]) {
    return this.getOrdersByStatusUseCase.execute(status);
  }

  async updateOrderStatus(orderId: string, updateData: { payment?: string, status?: string }) {
    return this.updateOrderStatusUseCase.execute(orderId, updateData);
  }

}

export default OrderService;
