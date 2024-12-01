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

export const OrderServices = {
  createOrderIntoDB,
};
