import { IOrderRepository } from '../../domain/interfaces/IOrderRepository';
import { Order } from '../../domain/entities/Order';
import OrderModel from '../frameworks/mongoose/models/OrderModel';

export class MongoOrderRepository implements IOrderRepository {
    async findById(orderId: string): Promise<Order | null> {
        const orderData = await OrderModel.findById(orderId).populate('user').populate('orderProducts.product');
        if (!orderData) return null;

        return new Order(
            orderData.id,
            orderData.user.id,
            orderData.status,
            orderData.orderProducts.map(p => ({
                productId: p.product.id,
                quantity: p.quantity,
                price: p.price
            })),
            orderData.createdAt,
            orderData.payment,
            orderData.totalAmount
        );
    }

    async save(order: Order): Promise<Order> {
        const orderModel = new OrderModel({
            user: order.userId,
            status: order.status,
            orderProducts: order.orderProducts.map(p => ({
                product: p.productId,
                quantity: p.quantity,
                price: p.price
            })),
            createdAt: order.createdAt,
            payment: order.paymentStatus,
            totalAmount: order.totalAmount
        });

        const savedOrder = await orderModel.save();
        return new Order(
            savedOrder.id,
            savedOrder.user.id,
            savedOrder.status,
            savedOrder.orderProducts.map(p => ({
                productId: p.product.id,
                quantity: p.quantity,
                price: p.price
            })),
            savedOrder.createdAt,
            savedOrder.payment,
            savedOrder.totalAmount
        );
    }

    async findByStatus(status: string[]): Promise<Order[]> {
        const ordersData = await OrderModel.find({ status: { $in: status } }).populate('user').populate('orderProducts.product');
        return ordersData.map(orderData => new Order(
            orderData.id,
            orderData.user.id,
            orderData.status,
            orderData.orderProducts.map(p => ({
                productId: p.product.id,
                quantity: p.quantity,
                price: p.price
            })),
            orderData.createdAt,
            orderData.payment,
            orderData.totalAmount
        ));
    }

    async findAll(): Promise<Order[]> {
        const ordersData = await OrderModel.find().populate('user').populate('orderProducts.product');
        return ordersData.map(orderData => new Order(
            orderData.id,
            orderData.user.id,
            orderData.status,
            orderData.orderProducts.map(p => ({
                productId: p.product.id,
                quantity: p.quantity,
                price: p.price
            })),
            orderData.createdAt,
            orderData.payment,
            orderData.totalAmount
        ));
    }

    async updateById(orderId: string, updateData: Partial<Order>): Promise<Order | null> {
        const updatedOrderData = await OrderModel.findByIdAndUpdate(orderId, updateData, { new: true }).populate('user').populate('orderProducts.product');
        if (!updatedOrderData) return null;

        return new Order(
            updatedOrderData.id,
            updatedOrderData.user.id,
            updatedOrderData.status,
            updatedOrderData.orderProducts.map(p => ({
                productId: p.product.id,
                quantity: p.quantity,
                price: p.price
            })),
            updatedOrderData.createdAt,
            updatedOrderData.payment,
            updatedOrderData.totalAmount
        );
    }
}