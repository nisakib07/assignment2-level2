import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { bike } = req.body;

    const result = await ProductServices.createProductIntoDB(bike);

    res.status(200).json({
      message: 'Bike created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();

    res.status(200).json({
      message: 'Bikes retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      message: 'Bike retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const updatedProduct = req.body;
    const result = await ProductServices.updateSingleProductInDB(
      productId,
      updatedProduct,
    );

    res.status(200).json({
      message: 'Bike updated successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.deleteSingleProductFromDB(productId);

    res.status(200).json({
      message: 'Bike deleted successfully',
      success: true,
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something went wrong',
      success: false,
      error: error.message,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
