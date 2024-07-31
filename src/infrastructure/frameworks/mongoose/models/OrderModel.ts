import mongoose, { Schema, Document } from 'mongoose';

// Define a interface para o documento de pedido
interface IOrder extends Document {
    user: mongoose.Schema.Types.ObjectId;
    status: string;
    orderProducts: Array<{
        product: mongoose.Schema.Types.ObjectId;
        quantity: number;
        price: number;
    }>;
    createdAt: Date;
    payment: string;
    totalAmount: number;
}

// Define o esquema Mongoose para a coleção de pedidos
const OrderSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, required: true },
    orderProducts: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    createdAt: { type: Date, default: Date.now },
    payment: { type: String, required: true },
    totalAmount: { type: Number, required: true }
});

// Cria e exporta o modelo Mongoose
const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
export default OrderModel;