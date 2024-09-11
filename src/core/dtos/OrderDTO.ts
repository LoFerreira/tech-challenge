export interface OrderDTO {
  id: string;
  userId: string;
  status: string;
  orderProducts: Array<{ productId: string; quantity: number; price: number }>;
  createdAt: Date;
  paymentStatus: string;
  totalAmount: number;
}
