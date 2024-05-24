import Order from "../model/OrderModel";

class OrderService {
  /*[CRIAR ORDER]*/
  static async createOrder({ userId }) {
    try {
      const newOrder = new Order({
        user: userId,
        status: "OPENED",
        createdAt: new Date(),
      });

      const savedOrder = await newOrder.save();
      return savedOrder.toJSON();
    } catch (err: any) {
      throw new Error(`Failed to create Order: ${err.message}`);
    }
  }

  /*[ATUALIZA ORDER]*/
  static async addProductsToOrder({ orderId, productIds }) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { $push: { orderProducts: { $each: productIds } } },
        { new: true }
      );
      return updatedOrder;
    } catch (err: any) {
      throw new Error(`Failed to add products to order: ${err.message}`);
    }
  }

  /*[LISTA ORDERS]*/
  static async getOrders() {
    try {
      return await Order.find({}).populate("user orderProducts");
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  /*[LISTA POR STATUS ORDERS]*/
  static async listOrdersByStatus(status: string[]) {
    try {
      return await Order.find({ status: { $in: status } }).populate(
        "user orderProducts"
      );
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}

/*[DISPONIBILIZA AS ORDER-SERVICES]*/
export default OrderService;
