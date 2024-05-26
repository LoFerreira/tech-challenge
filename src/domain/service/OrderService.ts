import Order from "../model/OrderModel";

class OrderService {
  /*[CRIAR ORDER]*/
  static async createOrder({ userId }) {
    try {
      const newOrder = new Order({
        user: userId,
        status: "OPENED",
        createdAt: new Date(),
        payment: "PENDING",
      });

      const savedOrder = await newOrder.save();
      return savedOrder.toJSON();
    } catch (err: any) {
      throw new Error(`Failed to create Order: ${err.message}`);
    }
  }

  /*[ADICIONAR PRODUTOS ORDER]*/
  static async addProductsToOrder({ orderId, productIds }) {
    try {
      const order = await Order.findById(orderId);

      if (!order) {
        throw new Error("Order not found");
      }

      productIds.forEach((productId) => {
        const existingProduct = order.orderProducts.find(
          (orderProduct) => orderProduct?.product?.toString() === productId
        );

        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          order.orderProducts.push({ product: productId, quantity: 1 });
        }
      });

      const updatedOrder = await order.save();
      return updatedOrder;
    } catch (err: any) {
      throw new Error(`Failed to add products to order: ${err.message}`);
    }
  }

  /*[CONFIRMAR ORDER]*/
  static async confirmOrder({ orderId, status, payment }) {
    try {
      const order = await Order.findById(orderId);

      if (!order) {
        throw new Error("Order not found");
      }

      if (!order.orderProducts || order.orderProducts.length === 0) {
        throw new Error("Order has no products");
      }

      order.status = status;
      order.payment = payment;

      const updatedOrder = await order.save();

      return updatedOrder;
    } catch (err: any) {
      throw new Error(`Failed to confirm order: ${err.message}`);
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
