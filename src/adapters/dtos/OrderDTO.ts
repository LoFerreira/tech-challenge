import { Product } from "../../core/entities/Product";
import { User } from "../../core/entities/User";
import { PAYMENT_STATUSES } from "../../external/database/mongoDB/frameworks/mongoose/models/OrderModel";

export interface OrderDTO {
  _id: string;
  user: User;
  status: typeof PAYMENT_STATUSES;
  orderProducts: Array<{
    product: Product;
    quantity: number;
    price: number;
  }>;
  createdAt: Date;
  paymentStatus: string;
  totalAmount: number;
}
