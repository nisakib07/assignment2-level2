import { error } from 'console';
import { ProductModel } from '../bike/product.model';
import { Order } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDB = async (order: Order) => {
  const { product, quantity } = order;

  const productDetails = await ProductModel.findById(product);

  if (!productDetails) {
    throw new Error('Product not found');
  }

  if (productDetails.quantity < quantity) {
    throw new Error(`Insufficient stock. ${quantity} bikes are available`);
  }

  productDetails.quantity -= quantity;
  if (productDetails.quantity === 0) {
    productDetails.inStock = false;
  }

  await productDetails.save();

  const result = await OrderModel.create(order);
  return result;
};

const getAllOdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

const getSindleOrderFromDB = async (orderId: string) => {
  const result = await OrderModel.findById(orderId);
  return result;
};

const updateOrderInDB = async (
  orderId: string,
  updatedOrder: Partial<Order>,
) => {
  const existingOrder = await OrderModel.findById(orderId);

  if (!existingOrder) {
    throw new Error('Order not found');
  }

  if (
    updatedOrder.quantity &&
    updatedOrder.quantity !== existingOrder.quantity
  ) {
    const productDetails = await ProductModel.findById(existingOrder.product);

    if (!productDetails) {
      throw new Error('Product not found');
    }

    const quantityChange = updatedOrder.quantity - existingOrder.quantity;

    if (productDetails.quantity < quantityChange) {
      throw new Error(
        `Insufficient stock. Only ${productDetails.quantity} bikes are available`,
      );
    }

    productDetails.quantity -= quantityChange;
  }
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOdersFromDB,
  getSindleOrderFromDB,
  updateOrderInDB,
};
