import Order from "../model/OrderModel";
import Product from "../model/ProductModel";
import User from "../model/UserModel";

class OrderService {
  /*[CHECKOUT ORDER]*/
  static async createOrder({ userCpf, products }) {
    try {
      let isUserIdentified = true;

      if (userCpf === null) {
        isUserIdentified = false;
      }

      const user = await User.findOne({
        cpf: isUserIdentified ? userCpf : "66a970f295dd1d123039c0c6",
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Calcular o valor total do pedido
      let totalAmount = 0;
      //TODO: IMPROVE THIS CODE
      const orderProducts = await Promise.all(
        products.map(async (product) => {
          console.log(product);
          const productData = await Product.findById(product.product);
          if (!productData) {
            throw new Error(`Product with ID ${product.product} not found`);
          }

          const productTotal = Number(productData.price) * product.quantity;
          totalAmount += productTotal;

          return {
            product: productData._id,
            quantity: product.quantity,
            price: Number(productData.price),
          };
        })
      );

      const newOrder = new Order({
        user: user._id,
        status: "OPENED",
        orderProducts,
        createdAt: new Date(),
        payment: "PENDING",
        totalAmount: totalAmount,
      });

      await newOrder.save();
      await newOrder.populate("user");

      return { "Número de identificação do pedido": newOrder?._id };
    } catch (err: any) {
      throw new Error(`Failed to create Order: ${err.message}`);
    }
  }

  /*[CONSULTAR STATUS DO PAGAMENTO DO PEDIDO]*/
  static async getOrderPaymentStatus(orderId: any) {
    try {
      const order = await Order.findById(orderId);
      console.log(order);
      if (!order) {
        throw new Error("Order not found");
      }

      return { "Status do pagamento": order?.payment };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  /*[LISTA ORDERS]*/
  static async getOrders() {
    try {
      const statusOrder = {
        OPENED: 0,
        RECEIVED: 1,
        PREPARING: 2,
        DONE: 3,
        FINISHED: 4,
        CANCELED: 5,
      };

      // Fetch the orders, filter out "finalizado" status, and populate the necessary fields
      let orders = await Order.find({
        status: { $nin: ["OPENED", "FINISHED", "CANCELED"] },
      })
        .populate("user")
        .populate("orderProducts.product")
        .lean(); // Use lean() to get plain JavaScript objects

      // Sort the orders by status and createdAt
      orders.sort((a, b) => {
        if (statusOrder[a.status] !== statusOrder[b.status]) {
          return statusOrder[a.status] - statusOrder[b.status];
        } else {
          //@ts-ignore
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
      });

      return orders;
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
