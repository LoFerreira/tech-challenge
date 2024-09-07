import express from 'express';
import OrderController from '../controllers/OrderController'; 

const router = express.Router();
const orderController = new OrderController(); // Instanciando a classe

router.get("/orders", orderController.getOrders.bind(orderController));
router.get("/orders/status", orderController.getOrderByStatus.bind(orderController));
router.get("/order/payment/status", orderController.getOrderPaymentStatus.bind(orderController));
router.post("/orders", orderController.createOrder.bind(orderController));
router.put("/order/:id/status", orderController.updateOrderStatus.bind(orderController));

export default router;
