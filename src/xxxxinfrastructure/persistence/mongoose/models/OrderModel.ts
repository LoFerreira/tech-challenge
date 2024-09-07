import mongoose, { Schema, Document } from 'mongoose';

// Define possíveis valores para status e pagamento
const ORDER_STATUSES = ['OPENED', 'RECEIVED', 'PREPARING', 'DONE', 'FINISHED', 'CANCELED'] as const;
const PAYMENT_STATUSES = ['PENDING', 'PROCESSING', 'PAID', 'UNPAID', 'REJECTED'] as const;

/*╔════════════════════════════════════╗
  ║  INTERFACE DO DOCUMENTO MONGOOSE: ORDER ║        
  ╚════════════════════════════════════╝*/
interface IOrder extends Document {
    user: mongoose.Schema.Types.ObjectId;
    status: typeof ORDER_STATUSES[number];
    orderProducts: Array<{
        product: mongoose.Schema.Types.ObjectId;
        quantity: number;
        price: number;
    }>;
    createdAt: Date;
    payment: typeof PAYMENT_STATUSES[number];
    totalAmount: number;
}

/*╔══════════════════════════════════════╗
  ║  ESQUEMA MONGOOSE PARA A COLEÇÃO ORDER ║        
  ╚══════════════════════════════════════╝*/
const OrderSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, required: true, enum: ORDER_STATUSES },
    orderProducts: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    createdAt: { type: Date, default: Date.now },
    payment: { type: String, required: true, enum: PAYMENT_STATUSES },
    totalAmount: { type: Number, required: true }
});

/*╔════════════════════════════╗
  ║  MODELO MONGOOSE DE ORDER  ║        
  ╚════════════════════════════╝*/
const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
export default OrderModel;
