import OrderModel from 'xxxxinfrastructure/persistence/mongoose/models/OrderModel'; // Usando alias ou caminho absoluto
import { IOrderRepository } from 'xxxdomain/interfaces/IOrderRepository';
import { Order } from 'xxxdomain/entities/Order';

/*╔═════════════════════════════════════════════╗
  ║  REPOSITÓRIO MONGOOSE PARA A COLEÇÃO ORDER  ║        
  ╚═════════════════════════════════════════════╝*/
class MongoOrderRepository implements IOrderRepository {
  
  /*╔═════════════════════════════════════╗
    ║  ENCONTRA UM PEDIDO PELO ID         ║        
    ╚═════════════════════════════════════╝*/
  async findById(orderId: string): Promise<Order | null> {
    const orderDocument = await OrderModel.findById(orderId).exec();
    return orderDocument ? this.mapToDomain(orderDocument) : null;
  }

  /*╔═════════════════════════════════════╗
    ║  SALVA UM NOVO PEDIDO               ║        
    ╚═════════════════════════════════════╝*/
  async save(order: Order): Promise<Order> {
    const orderDocument = new OrderModel(order);
    const savedOrder = await orderDocument.save();
    return this.mapToDomain(savedOrder);
  }

  /*╔═════════════════════════════════════╗
    ║  ENCONTRA PEDIDOS PELO STATUS       ║        
    ╚═════════════════════════════════════╝*/
  async findByStatus(status: string[]): Promise<Order[]> {
    const orders = await OrderModel.find({ status: { $in: status } }).exec();
    return orders.map(this.mapToDomain);
  }

  /*╔═════════════════════════════════════╗
    ║  ENCONTRA TODOS OS PEDIDOS          ║        
    ╚═════════════════════════════════════╝*/
  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.find().exec();
    return orders.map(this.mapToDomain);
  }

  /*╔═════════════════════════════════════╗
    ║  ATUALIZA UM PEDIDO PELO ID         ║        
    ╚═════════════════════════════════════╝*/
  async updateById(orderId: string, updateData: Partial<Order>): Promise<Order | null> {
    const orderDocument = await OrderModel.findByIdAndUpdate(orderId, updateData, { new: true }).exec();
    return orderDocument ? this.mapToDomain(orderDocument) : null;
  }

  /*╔═════════════════════════════════════╗
    ║  MAPEIA O DOCUMENTO PARA O DOMÍNIO  ║        
    ╚═════════════════════════════════════╝*/
  private mapToDomain(orderDocument: any): Order {
    return new Order(
      orderDocument._id,
      orderDocument.user,
      orderDocument.orderProducts,
      orderDocument.totalAmount,
      orderDocument.status,
      orderDocument.payment,
      orderDocument.createdAt,
      orderDocument.user
    );
  }
}

export default MongoOrderRepository;
