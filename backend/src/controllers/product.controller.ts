import { Request, Response } from 'express';
import Product from '../models/product.model';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;

    const query: any = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    const products = await Product.find(query)
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      data: products,
      page: +page,
      limit: +limit,
      total
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const product = await Product.create({ name, description, price, category, stock });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create product', error: err });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product', error: err });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err });
  }
};
