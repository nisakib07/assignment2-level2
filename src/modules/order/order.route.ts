import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

// POST route for creating an order
router.post('/', OrderControllers.createOrder);

export const OrdersRoute = router;
