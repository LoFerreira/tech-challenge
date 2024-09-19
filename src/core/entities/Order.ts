import { PAYMENT_STATUSES } from "../../external/database/mongoDB/frameworks/mongoose/models/OrderModel";
import { Product } from "./Product";
import { User } from "./User";

export class Order {
  constructor(
    public _id: string,
    public user: User,
    public status: typeof PAYMENT_STATUSES,
    public orderProducts: Array<{
      product: Product;
      quantity: number;
      price: number;
    }>,
    public createdAt: Date,
    public paymentStatus: string,
    public totalAmount: number //public user: User
  ) {}
}
