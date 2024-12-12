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

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOdersFromDB();

    res.status(200).json({
      message: 'Orders retrieved Successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const result = await OrderServices.getSindleOrderFromDB(orderId);
    res.status(200).json({
      message: 'Order data retrieved Successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const updatedData = req.body;

    const result = await OrderServices.updateOrderInDB(orderId, updatedData);

    res.status(200).json({
      message: 'Order updated Successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Failed to update order',
      status: false,
      error: error.message,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
};
