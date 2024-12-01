import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;

    const result = await OrderServices.createOrderIntoDB(orderData);

    res.status(200).json({
      message: 'Order is created Successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const OrderControllers = {
  createOrder,
};
