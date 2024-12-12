import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

// POST route for creating an order
router.post('/', OrderControllers.createOrder);

router.get('/', OrderControllers.getAllOrders);

router.get('/:orderId', OrderControllers.getSingleOrder);

router.put('/:orderId', OrderControllers.updateOrder);

export const OrdersRoute = router;
