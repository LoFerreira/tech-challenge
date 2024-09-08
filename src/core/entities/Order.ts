import { User } from "./User";

export class Order {
    constructor(
        public id: string,
        public userId: string,  
        public status: string,
        public orderProducts: Array<{ productId: string, quantity: number, price: number }>,
        public createdAt: Date,
        public paymentStatus: string,
        public totalAmount: number,
        public user: User 
    ) {}
}
