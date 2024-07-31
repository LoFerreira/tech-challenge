import { User } from "./User";

export class Order {
    constructor(
        public id: string,
        public userId: string,
        public userEmail: string,  // Adicionando o email do usuário
        public userName: string,   // Adicionando o nome do usuário
        public status: string,
        public orderProducts: Array<{ productId: string, quantity: number, price: number }>,
        public createdAt: Date,
        public paymentStatus: string,
        public totalAmount: number,
        public user: User // Incluindo a entidade User para informações detalhadas do usuário
    ) {}
}
