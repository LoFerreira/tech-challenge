import Order from "../model/OrderModel";
import User from "../model/UserModel";

class OrderService {
  /*[CHECKOUT ORDER]*/
  static async createOrder({ userCpf, products }) {
    try {
      let isUserIdentified = true;

      if (userCpf === null) {
        isUserIdentified = false;
      }

      const user = isUserIdentified
        ? await User.findOne({ cpf: userCpf })
        : { _id: "unidentified" };

      if (!user) {
        throw new Error("User not found");
      }

      const newOrder = new Order({
        user: user._id,
        status: "OPENED",
        orderProducts: products,
        createdAt: new Date(),
        payment: "PENDING",
      });

      await newOrder.save();
      await newOrder.populate("user");
      await newOrder.populate("orderProducts.product");

      return { "Número de identificação do pedido": newOrder?._id };
    } catch (err: any) {
      throw new Error(`Failed to create Order: ${err.message}`);
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
      return await Order.find({})
        .populate("user")
        .populate("orderProducts.product");
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  /*[LISTA POR STATUS ORDERS]*/
  static async getOrdersByStatus(status: any) {
    try {
      return await Order.find({ status: { $in: status } })
        .populate("user")
        .populate("orderProducts.product");
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}

/*[DISPONIBILIZA AS ORDER-SERVICES]*/
export default OrderService;
