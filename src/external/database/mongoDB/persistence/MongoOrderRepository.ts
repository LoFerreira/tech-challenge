// src/infrastructure/persistence/MongoOrderRepository.ts

import { IOrderRepository } from "../../../../adapters/repositories/IOrderRepository";
import { Order } from "../../../../core/entities/Order";
import { User } from "../../../../core/entities/User";
import OrderModel from "../frameworks/mongoose/models/OrderModel";

export class MongoOrderRepository implements IOrderRepository {
  async findById(orderId: string): Promise<Order | null> {
    const orderData = await OrderModel.findById(orderId)
      .populate("user")
      .populate("orderProducts.product")
      .lean();
    if (!orderData) return null;

    return new Order(
      (orderData._id as unknown as string).toString(),
      (orderData.user as unknown as string).toString(),
      orderData.status,
      orderData.orderProducts.map((p) => ({
        productId: (p.product as unknown as string).toString(),
        quantity: p.quantity,
        price: p.price,
      })),
      orderData.createdAt,
      orderData.payment,
      orderData.totalAmount,
      new User((orderData.user as unknown as string).toString(), "", "", "") // Ajuste com os campos corretos
    );
  }

  async save(order: Order): Promise<Order> {
    const orderModel = new OrderModel({
      user: order.userId,
      status: order.status,
      orderProducts: order.orderProducts.map((p) => ({
        product: p.productId,
        quantity: p.quantity,
        price: p.price,
      })),
      createdAt: order.createdAt,
      payment: order.paymentStatus,
      totalAmount: order.totalAmount,
    });

    const savedOrder = await orderModel.save();
    return new Order(
      (savedOrder._id as unknown as string).toString(),
      (savedOrder.user as unknown as string).toString(),
      savedOrder.status,
      savedOrder.orderProducts.map((p) => ({
        productId: (p.product as unknown as string).toString(),
        quantity: p.quantity,
        price: p.price,
      })),
      savedOrder.createdAt,
      savedOrder.payment,
      savedOrder.totalAmount,
      new User((savedOrder.user as unknown as string).toString(), "", "", "") // Ajuste com os campos corretos
    );
  }

  async findByStatus(status: string[]): Promise<Order[]> {
    const ordersData: Order[] = await OrderModel.find({
      status: { $in: status },
    })
      .populate("user")
      .populate("orderProducts.product")
      .lean();

    return ordersData.map((orderData) => {
      const userData = orderData.user as User;
      const orderProductsData = orderData.orderProducts.map((orderProduct) => ({
        product: orderProduct.product,
        price: orderProduct.price,
        quantity: orderProduct.quantity,
      }));

      return new Order(
        orderData._id.toString(),
        new User(
          userData._id.toString(), // Assuming this is the user ID
          userData.name, // Adjust with actual field names
          userData.cpf, // Adjust with actual field names
          userData.email // Adjust with actual field names
        ),
        orderData.status,
        orderProductsData,
        orderData.createdAt,
        orderData.paymentStatus,
        orderData.totalAmount
      );
    });
  }

  async findAll(): Promise<Order[]> {
    const ordersData = await OrderModel.find()
      .populate("user")
      .populate("orderProducts.product")
      .lean();
    return ordersData.map(
      (orderData) =>
        new Order(
          (orderData._id as unknown as string).toString(),
          (orderData.user as unknown as string).toString(),
          orderData.status,
          orderData.orderProducts.map((p) => ({
            productId: (p.product as unknown as string).toString(),
            quantity: p.quantity,
            price: p.price,
          })),
          orderData.createdAt,
          orderData.payment,
          orderData.totalAmount,
          new User((orderData.user as unknown as string).toString(), "", "", "") // Ajuste com os campos corretos
        )
    );
  }

  async updateById(
    orderId: string,
    updateData: Partial<Order>
  ): Promise<Order | null> {
    const updatedOrderData = await OrderModel.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    )
      .populate("user")
      .populate("orderProducts.product")
      .lean();
    if (!updatedOrderData) return null;

    return new Order(
      (updatedOrderData._id as unknown as string).toString(),
      (updatedOrderData.user as unknown as string).toString(),
      updatedOrderData.status,
      updatedOrderData.orderProducts.map((p) => ({
        productId: (p.product as unknown as string).toString(),
        quantity: p.quantity,
        price: p.price,
      })),
      updatedOrderData.createdAt,
      updatedOrderData.payment,
      updatedOrderData.totalAmount,
      new User(
        (updatedOrderData.user as unknown as string).toString(),
        "",
        "",
        ""
      ) // Ajuste com os campos corretos
    );
  }
}
